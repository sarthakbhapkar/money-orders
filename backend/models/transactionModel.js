const pool = require('../../db/pool');

const getAllTransactions = () => {
    return pool.query('SELECT * FROM transactions ORDER BY created_at DESC LIMIT 10');
};

const getUserBalance = (user_id) =>{
    return pool.query(`SELECT balance FROM users WHERE id=${user_id}`);
}

const updateUserBalance = (user_id, newBalance) => {
    return pool.query('UPDATE users SET balance = $1 WHERE id = $2', [newBalance, user_id]);
};

const deposit = (user_id, amount) => {
    return pool.query(
        'INSERT INTO transactions (user_id, type, amount) VALUES ($1, $2, $3) RETURNING *',
        [user_id, 'deposit', amount]
    );
};

const withdraw = (user_id, amount) => {
    return pool.query(
        'INSERT INTO transactions (user_id, type, amount) VALUES ($1, $2, $3) RETURNING *',
        [user_id, 'withdraw', amount]
    );
};

const transfer = (from_user_id, to_user_id, amount) => {
    return pool.query('BEGIN')
        .then(() => pool.query(
            'INSERT INTO transactions (user_id, type, amount, to_user_id) VALUES ($1, $2, $3, $4) RETURNING *',
            [from_user_id, 'transfer', amount, to_user_id]
        ))
        .then(() => pool.query('COMMIT'))
        .catch(error => {
            pool.query('ROLLBACK');
            throw error;
        });
};

const getHistoryByUser = (user_id) => {
    return pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC', [user_id]);
};

const getHistoryOfUser = (user_id,count) =>{
    return pool.query('SELECT * FROM transactions WHERE user_id = $1 ORDER BY created_at DESC limit $2', [user_id,count]);
}

const getTransactions = (count) =>{
    return pool.query('SELECT * FROM transactions ORDER BY created_at DESC limit $1', [count]);
}

module.exports = {
    getAllTransactions,
    deposit,
    withdraw,
    transfer,
    getHistoryByUser,
    getUserBalance,
    updateUserBalance,
    getHistoryOfUser,
    getTransactions
};
