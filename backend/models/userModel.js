const pool = require('../../db/pool');

const getAllUsers  = () => {
    return pool.query('SELECT * FROM users ORDER BY name DESC');
}

const getAllRoles = () =>{
    return pool.query('SELECT role FROM users ORDER BY name DESC');
}

const getUserId = (email) =>{
    return pool.query('SELECT id,role FROM users where email = $1 ORDER BY email DESC',[email]);
}

const getEmail =(user_id) =>{
    return pool.query('SELECT email FROM users where id = $1',[user_id]);
}

const getUserById = (id) => {
    return pool.query('SELECT * FROM users WHERE id = $1 ORDER BY id', [id]);
}

const insertUser = (name,email,password) =>{
    return pool.query('INSERT INTO users (name, email, password) VALUES ($1,$2,$3) RETURNING *', [name,email,password]);
}

const makeAdmin = (user_id)=>{
    return pool.query(`UPDATE users set role='manager' where id=$1`, [user_id]);
}

module.exports = {
    getAllUsers,
    getAllRoles,
    getUserId,
    getEmail,
    getUserById,
    insertUser,
    makeAdmin
};