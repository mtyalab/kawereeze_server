const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const reversalSchema = new Schema(
    {
        status: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        phoneNumber: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        amount: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        reversalDate: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        recipientName: {
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

module.exports = mongoose.model("reversal", reversalSchema);