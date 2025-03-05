const userModel = require("../models/userModel");
const bcrypt = require('bcrypt');
const {validationResult} = require("express-validator");

const getAllUsers = async (req, res) => {
    try{
        const users = await userModel.getAllUsers();
        res.status(200).json(users.rows);
    }catch(err){
        res.status(500).json(err);
    }
}

const getAllRoles = async (req, res) => {
    try{
        const roles = await userModel.getAllRoles();
        res.status(200).json(roles.rows);
    }catch(err){
        res.status(500).json(err);
    }
}

const getUserId =async (req, res) => {
    const {email} = req.body;
    try{

        const id = await userModel.getUserId(email);
        res.status(200).json(id);
    }catch{
        res.status(500).json(err);
    }
}

const getUserById  = async (req, res) => {
    const {user_id} = req.params;
    if(!user_id) return res.status(404).json({error: 'Please enter user_id'});

    try{
        const user=await userModel.getUserById(user_id);
        res.status(200).json(user.rows);
    }catch (err){
        res.status(500).json(err);
    }
}

const insertUser = async (req, res)=> {
    const result = validationResult(req);
    if(!result.isEmpty()){
        return res.status(400).json({error: result.array()});
    }

    else {
        let {name, email, password} = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({error: 'Please provide from_user_id, to_user_id, and amount'});
        }

        try {
            // bcrypt.hash(password, 10, (err, hash) => {
            //     console.log('hishrey');
            //     if (err) {
            //         console.error('Error hashing password:', err);
            //     } else {
            //
            //         console.log('Hashed Password:', hash);
            //         password=hash;
            //         console.log('password:', password);
            //     }
            // });
            const hashedPassword = await bcrypt.hash(password, 10);
            console.log('Hashed Password:', hashedPassword);


            const insertUser = await userModel.insertUser(name, email, hashedPassword);
            res.json(insertUser);
        } catch (err) {
            res.status(500).json({error: err.message});
        }
    }
}

const makeAdmin = async (req,res) =>{
    const {user_id} =req.body;
    if(!user_id) return res.status(404).json({error: 'Please enter user_id'});
    try{
        const user=await userModel.makeAdmin(user_id);
        res.status(200).json(user.rows);
    }catch (err){
        res.status(500).json(err);
    }
}

module.exports = {
    getAllUsers,
    getAllRoles,
    getUserId,
    getUserById,
    insertUser,
    makeAdmin
};