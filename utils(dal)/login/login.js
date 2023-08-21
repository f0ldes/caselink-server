const pool = require('../database/database');

function getPassword(password) {
    return new Promise((resolve, reject) => {
        const query = 'SELECT COUNT(*) as count FROM USERS WHERE password = ?';
        pool.query(query, [password], (error, results) => {
            if (error) {
                reject(error);
            } else {
                if (results.length > 0) {
                    resolve(results[0].role);
                } else {
                    resolve(null);
                }
            }
        })
    })
}


module.exports = {
    getPassword
}