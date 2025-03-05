// const pool = require('../db/pool');
//
// setInterval(async () => {
//     let data = await pool.query("select * from transactions");
//     console.log(data.rows);
// }, 1000);

const pool = require('./db/pool');

setInterval(async () => {
    try {

        let { rows: transactions } = await pool.query(`SELECT * FROM transactions WHERE status = 'Pending' order by created_at DESC limit 10`);
        let { rows: users } = await pool.query(`SELECT * FROM users`);

        for (const transaction of transactions) {

            const user = users.find(u => u.id === transaction.user_id);
            if (!user) res.status(500).json("Failed");
            const userHasBalance =(transaction.amount > user.balance);
            if (transaction.type === 'withdraw') {
                console.log("transaction amt", transaction.amount);
                console.log("user balance",user.balance);
                console.log(transaction.amount > user.balance);
                console.log("userHasBalance", userHasBalance);

                if (transaction.amount > user.balance) {
                    await pool.query(`UPDATE transactions SET status = $1 WHERE id = $2`, ['Failed', transaction.id]);
                } else {
                    await pool.query(`UPDATE users SET balance = balance - $1 WHERE id = $2`, [transaction.amount, user.id]);
                    await pool.query(`UPDATE transactions SET status = $1 WHERE id = $2`, ['Processed', transaction.id]);
                }
            }

            if(transaction.type=== 'transfer') {
                if (userHasBalance) {
                    await pool.query(`UPDATE transactions SET status = $1 WHERE id = $2`, ['Failed', transaction.id]);
                } else {
                    await pool.query(`UPDATE users SET balance = balance - $1 WHERE id = $2`, [transaction.amount, user.id]);
                    await pool.query(`UPDATE users SET balance = balance + $1 WHERE id = $2`, [transaction.amount, transaction.to_user_id]);
                    await pool.query(`UPDATE transactions SET status = $1 WHERE id = $2`, ['Processed', transaction.id]);
                }
            }

            if(transaction.type==='deposit'){
                await pool.query(`UPDATE users SET balance = balance + $1 WHERE id = $2`, [transaction.amount, user.id]);
                await pool.query(`UPDATE transactions SET status='Processed' WHERE id=$1`,[transaction.id]);
            }
        }
    } catch (error) {
        console.error('Error processing transactions:', error);
    }
}, 6000);