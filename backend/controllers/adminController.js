const adminModel = require("../models/adminModel");

const bcrypt = require('bcrypt')

const jwt = require("jsonwebtoken");

const key=require('dotenv').config();


console.log('JWT Secret:', process.env.JWT_SECRET);

const authAdmin = async (req, res) => {
    const { username, password } = req.body;
    try {
        const admin = await adminModel.findAdmin(username);

        if (!admin) return res.status(400).json({ error: 'Admin not found' });


        const validPassword = await bcrypt.compare(password.trim(), admin.password.trim());
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // const token = jwt.sign({ id: admin.id, role: admin.role }, process.env.JWT_SECRET, { expiresIn: '1m' });

        console.log('Generated Token:', token);
        res.json({token,role:admin.role, user_id: admin.id, email: admin.email});
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json(err);
    }
};


module.exports = {
    authAdmin
};