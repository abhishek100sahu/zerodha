require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (userId) => {
    const secret = process.env.JWT_SECRET || "defaultSecretKey"; // Use a secure secret in production
    if (!secret) {
        throw new Error("JWT_SECRET is not defined");
    }
    return jwt.sign({ id: userId }, secret, { expiresIn: "1d" });
};

module.exports = { createSecretToken };
