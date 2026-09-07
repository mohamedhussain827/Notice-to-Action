const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

const REQUIRED = ['GOOGLE_SHEET_ID', 'GOOGLE_CLIENT_EMAIL', 'GOOGLE_PRIVATE_KEY'];
const missing = REQUIRED.filter((k) => !process.env[k]);
if (missing.length) {
  console.warn(
    `⚠️  Missing env vars: ${missing.join(', ')}. ` +
      `API calls that touch the sheet will fail until these are set in .env`
  );
}

const serviceAccountAuth = new JWT({
  email: process.env.GOOGLE_CLIENT_EMAIL,
  key: (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID, serviceAccountAuth);

let loaded = false;

/** Loads (or reuses) the spreadsheet's metadata + sheet/tab list. */
async function loadDoc() {
  if (!loaded) {
    await doc.loadInfo();
    loaded = true;
  }
  return doc;
}

const REQUIRED_TABS = {
  Users: ['userId', 'name', 'email', 'password', 'role', 'department', 'year', 'createdAt'],
  Notices: [
    'noticeId', 'title', 'description', 'category', 'source', 'targetDepartment',
    'targetYear', 'publishDate', 'deadline', 'priority', 'originalFile', 'createdBy', 'createdAt',
  ],
  Tasks: ['taskId', 'noticeId', 'userId', 'taskName', 'deadline', 'status', 'completedAt'],
  Documents: ['documentId', 'noticeId', 'documentName', 'required'],
  Reminders: ['reminderId', 'userId', 'noticeId', 'reminderDate', 'status'],
  Notifications: ['notificationId', 'userId', 'message', 'type', 'readStatus', 'createdAt'],
};

/** One-time helper: creates any missing tabs with the right header row. Safe to call repeatedly. */
async function ensureSheetsExist() {
  await loadDoc();
  for (const [title, headers] of Object.entries(REQUIRED_TABS)) {
    let sheet = doc.sheetsByTitle[title];
    if (!sheet) {
      console.log(`Creating missing sheet tab: ${title}`);
      sheet = await doc.addSheet({ title, headerValues: headers });
    } else {
      await sheet.loadHeaderRow().catch(() => {});
      if (!sheet.headerValues || sheet.headerValues.length === 0) {
        await sheet.setHeaderRow(headers);
      }
    }
  }
}

module.exports = { doc, loadDoc, ensureSheetsExist, REQUIRED_TABS };
