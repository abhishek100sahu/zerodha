const { Schema } = require('mongoose');

const HoldingsSchema = new Schema({
    name: { type: String, required: true },
    qty: Number,
    avg: Number,
    price: Number,
    net: String,
    day: String,
});

module.exports = { HoldingsSchema };