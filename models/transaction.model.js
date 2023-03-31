const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const transactionSchema = new Schema(
    {
        tx_ref: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        amount: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        transactionDate: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        status: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        currency: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        network: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        recipientPhoneNumber: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        senderName: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        senderEmail: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        countryCode: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        userId: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("transaction", transactionSchema);