const { doc, loadDoc } = require('../config/sheets');

/** Gets a tab by name, throwing a clear error if it doesn't exist yet. */
async function getSheet(title) {
  await loadDoc();
  const sheet = doc.sheetsByTitle[title];
  if (!sheet) {
    throw new Error(
      `Sheet tab "${title}" was not found. Run "npm run seed" once to create all required tabs.`
    );
  }
  return sheet;
}

async function getAllRows(title) {
  const sheet = await getSheet(title);
  return sheet.getRows();
}

async function addRow(title, data) {
  const sheet = await getSheet(title);
  return sheet.addRow(data);
}

async function findRow(title, field, value) {
  const rows = await getAllRows(title);
  return rows.find((r) => r.get(field) === value) || null;
}

async function findRows(title, field, value) {
  const rows = await getAllRows(title);
  return rows.filter((r) => r.get(field) === value);
}

async function updateRow(title, field, value, updates) {
  const row = await findRow(title, field, value);
  if (!row) return null;
  Object.entries(updates).forEach(([k, v]) => row.set(k, v));
  await row.save();
  return row;
}

async function deleteRow(title, field, value) {
  const row = await findRow(title, field, value);
  if (!row) return false;
  await row.delete();
  return true;
}

module.exports = { getSheet, getAllRows, addRow, findRow, findRows, updateRow, deleteRow };
