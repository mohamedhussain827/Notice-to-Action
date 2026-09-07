require('dotenv').config();
const { ensureSheetsExist } = require('../config/sheets');

(async () => {
  try {
    console.log('Connecting to your Google Sheet…');
    await ensureSheetsExist();
    console.log('✅ Done. Your sheet now has all 6 required tabs with the right headers:');
    console.log('   Users, Notices, Tasks, Documents, Reminders, Notifications');
  } catch (err) {
    console.error('❌ Could not set up the sheet:', err.message);
    console.error('Double-check GOOGLE_SHEET_ID, GOOGLE_CLIENT_EMAIL, GOOGLE_PRIVATE_KEY in .env,');
    console.error('and make sure the sheet is shared with the service account email as an Editor.');
    process.exit(1);
  }
})();
