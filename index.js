require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");
const { HoldingsModel } = require("./models/HoldingsModel");
const { OrdersModel } = require("./models/OrderModel");


const app = express();
app.use(bodyParser.json());
app.use(
    cors({
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    })
);
app.use(cookieParser());
app.use("/", authRoute);

const PORT = process.env.PORT || 3000;
const URI = process.env.MONGO_URL

app.get('/getHoldings', async (req, res) => {
    let tempHoldings = [{
        name: "WIPRO",
        qty: 42,
        avg: 12,
        price: 324.6,
        net: '+18.43',
        day: '+0.62',
    },
    {
        name: "INFOSYS",
        qty: 23,
        avg: 12,
        price: 784.6,
        net: '+16.43',
        day: '+0.32',
    }
    ]

    await tempHoldings.forEach((element) => {
        let newHoldings = new HoldingsModel({
            name: element.name,
            qty: element.qty,
            avg: element.avg,
            price: element.price,
            net: element.net,
            day: element.day
        })
        newHoldings.save();
    });
    res.send("done!")
})

app.get('/allHoldings', async (req, res) => {
    let allHoldings = await HoldingsModel.find({})

    res.json(allHoldings)
})

app.post('/newOrder', async (req, res) => {
    let newOrder = new OrdersModel({
        name: req.body.name,
        qty: req.body.qty,
        price: req.body.price,
        mode: req.body.mode,
    })
    await newOrder.save();
    res.json(newOrder)
})

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
    mongoose.connect(URI);
    mongoose.connection.on('connected', () => console.log('Connected to MongoDB'));
});
