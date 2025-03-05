const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');
const authenticateJWT = require('../middleware/verifyJWT');
const authorizeRole = require('../middleware/authorizeRole');

router.get('/',authenticateJWT, authorizeRole(['manager']), transactionController.getAllTransactions);
router.post('/deposit' , transactionController.deposit);
router.post('/withdraw', transactionController.withdraw);
router.post('/transfer', transactionController.transfer);
router.get('/history/:user_id',authenticateJWT, transactionController.getHistoryByUser);
router.post('/send-transaction-history',transactionController.getHistoryOfUser);
router.post('/admin',transactionController.getTransactions);


// router.get('/', transactionController.getAllTransactions);
// router.post('/deposit', transactionController.deposit);
// router.post('/withdraw', transactionController.withdraw);
// router.post('/transfer', transactionController.transfer);
// router.get('/history/:user_id', transactionController.getHistoryByUser);

module.exports = router;
