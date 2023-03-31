const JWT = require("jsonwebtoken");
const User = require("../models/user.model");
const Token = require("../models/token.model");
const sendEmail = require("../utils/emails/sendEmail");
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const {token} = require("morgan");

const JWTSecret = process.env.JWT_SECRET;
const bcryptSalt = process.env.BCRYPT_SALT;
const clientURL = process.env.CLIENT_URL;

const login = async (data) => {
    let user = await User.findOne({ email: data.email });
    if (!user) {
        throw new Error("User not found");
    }
    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) {
        throw new Error("Incorrect password");
    }
    const token = JWT.sign({ id: user._id }, JWTSecret);

    return (data =
        {
            id: user._id,
            firstName: user.firstName,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            password: user.password,
            code: '200'
        });
};

const signup = async (data) => {
    let user = await User.findOne({ email: data.email });
    if (user) {
        throw new Error("Email already exist");
    }
    user = new User(data);
    const token = JWT.sign({ id: user._id }, JWTSecret);
    await user.save();

    return (data = {
        userId: user._id,
        email: user.email,
        firstName: user.firstName,
        surname: user.surname,
        password: user.password,
        token: token,
    });
};

const requestPasswordReset = async (email) => {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email does not exist");

    let token = await Token.findOne({ userId: user._id });
    if (token) await token.deleteOne();

    let resetToken = crypto.randomBytes(32).toString("hex");
    const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));

    await new Token({
        userId: user._id,
        token: hash,
        createdAt: Date.now(),
    }).save();

    const link = `${clientURL}/passwordReset?token=${resetToken}&id=${user._id}`;

    sendEmail(
        user.email,
        "Password Reset Request",
        {
            name: user.name,
            link: link,
        },
        "./template/requestResetPassword.hbs"
    );
    return { link };
};

const resetPassword = async (userId, token, password) => {
    let passwordResetToken = await Token.findOne({ userId });

    if (!passwordResetToken) {
        throw new Error("Invalid or expired password reset token");
    }

    console.log(passwordResetToken.token, token);

    const isValid = await bcrypt.compare(token, passwordResetToken.token);

    if (!isValid) {
        throw new Error("Invalid or expired password reset token");
    }

    const hash = await bcrypt.hash(password, Number(bcryptSalt));

    await User.updateOne(
        { _id: userId },
        { $set: { password: hash } },
        { new: true }
    );

    const user = await User.findById({ _id: userId });

    sendEmail(
        user.email,
        "Password Reset Successfully",
        {
            name: user.name,
        },
        "./template/resetPassword.hbs"
    );

    await passwordResetToken.deleteOne();

    return { message: "Password reset was successful" };
};

module.exports = {
    login,
    signup,
    requestPasswordReset,
    resetPassword,
};