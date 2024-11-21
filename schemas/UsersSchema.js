const { Schema } = require('mongoose');
const bcrypt = require("bcryptjs");

const UsersSchema = new Schema({
    email: {
        type: String,
        required: [true, "Your email address is required"],
        unique: true,
    },
    username: {
        type: String,
        required: [true, "Your username is required"],
    },
    password: {
        type: String,
        required: [true, "Your password is required"],
    },
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

UsersSchema.pre("save", async function (next) {
    console.log("Password before hashing:", this.password);
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 12);
    console.log("Password after hashing:", this.password);
    next();
});



module.exports = { UsersSchema };