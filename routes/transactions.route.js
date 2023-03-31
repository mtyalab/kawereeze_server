const express = require('express');
const Transaction = require("../models/transaction.model");
const FLUTTERWAVE_API_KEY = "";
const API_ENDPOINT = "https://api.flutterwave.com/v3/mobile-money/send";


const router = express.Router();


router.get("/all-transactions/:id", async (req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        if (!transaction) {
            return res.status(404).json({ error: "Transaction not found" });
        }
        const data = {
            id: transaction._id,
            amount: transaction.amount,
            recipientName: transaction.recipientName,
            transactionDate: transaction.transactionDate,
            status: transaction.status,
            recipientPhoneNumber: transaction.recipientPhoneNumber,
            userId: transaction.userId
        };
        return res.json(data);
    } catch (error) {
        next(error);
    }
});


router.post("/transactions/send-money", async (req, res) => {
    const headers = {
        'Authorization': `Bearer ${FLUTTERWAVE_API_KEY}`,
        'Content-Type': 'application/json'
    };

    let data = {
        "tx_ref" : "",
        "amount": req.body.amount,
        "currency": req.body.currency,
        "country": req.countryCode,
        "phoneNumber": req.body.recipientPhoneNumber,
        "network": req.body.network,
        "email": req.body.senderEmail,
        "fullname": req.body.senderEmail
    };

    try {
        const response = await fetch(
            API_ENDPOINT,
            {
                method: 'POST',
                headers,
                body: JSON.stringify(data),
            }
        );
        const responseData = await response.json();
        if(responseData) {
            data = {
                "tx_ref" : req.body.tx_ref,
                "amount": req.body.amount,
                "currency": req.body.currency,
                "countryCode": req.countryCode,
                "recipientPhoneNumber": req.body.recipientPhoneNumber,
                "network": req.body.network,
                "senderEmail": req.body.senderEmail,
                "senderName": req.body.senderName
            };

           const transaction =  await new Transaction(data).save();


            res.status(200).send(transaction);
        } else {
            res.status(400).send({error: "Error completing transaction"});

        }

    } catch (error) {
        res.status(500).json({error: "Failed to send mobile money payment"});
    }
});

module.exports = router;