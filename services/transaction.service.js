const Transaction = require("../models/transaction.model");


const userTransactions = async (data, res) => {
    try {
        const transaction = await Transaction.findById(data.userId);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        return {
            id: transaction._id,
            amount: transaction.amount,
            recipientName: transaction.recipientName,
            transactionDate: transaction.transactionDate,
            status: transaction.status,
            recipientPhoneNumber: transaction.recipientPhoneNumber,
            userId: transaction.userId
        };
    } catch (error) {
        next(error);
    }
}

module.exports = {
    userTransactions,
};