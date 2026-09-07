const { v4: uuidv4 } = require('uuid');

/** e.g. shortId('u') -> "u_9f1c2a3b" */
function shortId(prefix) {
  return `${prefix}_${uuidv4().split('-')[0]}`;
}

module.exports = { shortId };
