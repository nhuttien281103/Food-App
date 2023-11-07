const functions = require("firebase-functions");
const admin = require("firebase-admin");
require("dotenv").config();

const serviceAccount = require("./serviceAccountKey.json");

const express = require("express");
const app = express();

// ! body parser for our JSON data
app.use(express.json());

// ! cross orgin
const cors = require("cors");
// eslint-disable-next-line object-curly-spacing
app.use(cors({ origin: true }));
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

// ! firebase credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// ! api endpoint
app.get("/", (req, res) => {
  return res.send("hello world");
});

// ! router user
const userRoute = require("./routes/userRoute");
app.use("/api/users", userRoute);

// ! router product
const productRoute = require("./routes/productRoute");
app.use("/api/products", productRoute);

exports.app = functions.https.onRequest(app);
