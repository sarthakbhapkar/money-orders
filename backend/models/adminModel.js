const pool = require("../../db/pool");

const checkIfAdminExists = (user_email,password) => {
    return pool.query(`select exists(select  * from users where (email = ${user_email}) and (password = ${password}) and role='manager'`);
}

const findAdmin = async (username) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users WHERE email = $1 AND (role = 'manager' or role='customer')`,
            [username]
        );
        return result.rows[0];
    } catch (error) {
        console.error('Error querying database:', error);
        throw error;
    }
};


module.exports = {
    checkIfAdminExists,
    findAdmin
};