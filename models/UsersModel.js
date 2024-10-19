const { model } = require("mongoose");

const { UsersSchema } = require("../schemas/UsersSchema")

const UsersModel = model("Users", UsersSchema);

module.exports = { UsersModel };