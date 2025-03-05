const transactionsModel = require('../models/transactionModel');
const currentBalanceResult = require("pg/lib/query");
const nodemail = require('../node-mailer');
const usersModel = require('../models/userModel');

const getAllTransactions = async (req, res) => {
    try{
        const transactions = await transactionsModel.getAllTransactions();

        res.status(200).json(transactions.rows);
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

const deposit = async (req, res) => {
    const { user_id, amount } = req.body;
    if (!user_id || !amount || amount<0) {
        return res.status(400).json({ error: 'Please provide both user_id and amount' });
    }

        const depositResult = await transactionsModel.deposit(user_id, amount);

        res.json(depositResult);
};

const withdraw = async (req, res) => {
    const{user_id, amount} = req.body;
    if(!user_id || !amount || amount<0) return res.status(404).json({error: 'Please enter all the fields'});
            const withdrawResult = await transactionsModel.withdraw(user_id, amount);
            res.json(withdrawResult);
}

const transfer = async (req, res) => {
    const { from_user_id, to_user_id, amount } = req.body;

    if (!from_user_id || !amount || !to_user_id || amount<0) {
        return res.status(400).json({ error: 'Please provide from_user_id, to_user_id, and amount' });
    }

    try {
        const transfer=await transactionsModel.transfer(from_user_id, to_user_id, amount); // Record the transaction
        res.json(transfer);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


const getHistoryByUser=async (req, res) => {
    const {user_id} = req.params;
    if(!user_id) return res.status(404).json({error: 'Please enter user_id'});

    try{
        const history = await transactionsModel.getHistoryByUser(user_id);
        res.status(200).json(history.rows);
    }catch (err){
        res.status(500).json(err);
    }
}

const getHistoryOfUser = async (req,res) =>{
    const { recordCount, subject, text } = req.body;
    const user_id = req.body.user_id;

    try{

        const history= await transactionsModel.getHistoryOfUser(user_id, recordCount);
        const user = await usersModel.getEmail(user_id);

        const row=JSON.stringify(history.rows, null, 2);

        await nodemail.sendEmail(user.rows[0].email, subject, row);
        res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error) {
        console.error('Error fetching transactions or sending email:', error);
        res.status(500).json({ message: 'Failed to send transaction history.' });
    }
}

const getTransactions = async (req, res) => {

    const { recordCount, subject, text , user_id} = req.body;

    try{
        const transactions = await transactionsModel.getTransactions(recordCount);
        const user = await usersModel.getEmail(user_id);
        const row=JSON.stringify(transactions.rows, null, 2);
        await nodemail.sendEmail(user.rows[0].email, subject, row);

        res.status(200).json({ message: 'Email sent successfully.' });
    }catch(err){
        res.status(500).json(err);
        console.log(err);
    }
}

module.exports = {
    getAllTransactions,
    deposit,
    withdraw,
    transfer,
    getHistoryByUser,
    getHistoryOfUser,
    getTransactions
};


