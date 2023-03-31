const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const bcryptSalt = process.env.BCRYPT_SALT;
const userSchema = new Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
            unique: true,
        },
        surname: {
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
        email: {
            type: String,
            trim: true,
            unique: true,
            required: true,
        },
        password: {
            type: String},
    },
    {
        timestamps: true,
    }
);
userSchema.pre("save", async function(next) {
   if(!this.isModified("password")) {
       return next();
   }
   this.password = await bcrypt.hash(this.password, Number(bcryptSalt));
   next();
});
module.exports = mongoose.model("user", userSchema);