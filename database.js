const sqlite3 = require('sqlite3');

var connection = new sqlite3.Database('./data.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the database successfully.');
});

module.exports = { connection };