// const User = require("../models/UsersModel");
const { UsersModel: User } = require("../models/UsersModel");

const { createSecretToken } = require("../utils/SecretToken");
const bcrypt = require("bcryptjs");

module.exports.Signup = async (req, res) => {
    try {
        const { email, password, username, createdAt } = req.body;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(409).json({ message: "User already exists" });
        }

        // Create the new user
        const user = await User.create({ email, password, username, createdAt });

        // Generate a token
        const token = createSecretToken(user._id);

        // Set the token in a cookie
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: true, // Use secure settings for production
        });

        // Send the response
        res.status(201).json({
            message: "User signed in successfully",
            success: true,
            user,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
