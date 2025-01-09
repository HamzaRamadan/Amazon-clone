// const functions = require("firebase-functions");
// const express = require("express");
// const cors = require("cors");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// // App config
// const app = express();

// // middlewares

// app.use(cors({origin: true}));
// app.use(express.json());

// // API Routes
// app.get("/", (req, res) => res.status(200).send("Hello World"));
// app.post("/payments/create", async (req, res) => {
//   const total = req.query.total;
//   const paymentIntent = await stripe.paymentIntents.create({
//     amount: total,
//     currency: "usd",
//   });
//   // Ok - created
//   res.status(201).send({
//     clientSecret: paymentIntent.client_secret,
//   });
// });

// exports.api = functions.https.onRequest(app);
// // example endpoint
// // http://127.0.0.1:5001/clone-dfcdb/us-central1/api
// // http://127.0.0.1:5001/clone-9007e/us-central1/api
// // Listen command


const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const stripe = require("stripe")("sk_test_51Qeht8D89dEBPSrn711gl0tD9imFiMTKo7Kwej8bl4LkJtQWGCk7gt61SQSlv6St1jQHRoEIO0XlSM77MssFWPbG00i7WpJMam");

// App config
const app = express();

// middlewares
app.use(cors({origin: true}));
app.use(express.json());

// API Routes
app.get("/", (req, res) => res.status(200).send("Hello World"));

app.post("/payments/create", async (req, res) => {
  try {
    const total = req.query.total;
    if (!total) {
      return res.status(400).send("Total amount is required");
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: "usd",
    });

    res.status(201).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    res.status(500).send("Internal Server Error");
  }
});

exports.api = functions.https.onRequest(app);
