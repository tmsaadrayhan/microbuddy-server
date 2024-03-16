const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

var cors = require("cors");
const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

require("dotenv").config();
console.log(process.env.AUTH_PASS);

/*const transporter = nodemailer.createTransport({
  host: "mail.microbuddy.tech",
  port: 587,
  secure: true,
  auth: {
    user: "saad@microbuddy.tech",
    pass: password,
  },
  tls: {
    // do not fail on invalid certs
    rejectUnauthorized: false,
  },
});
const info = {
  from: { name: "Saad", address: "saad@microbuddy.tech" }, // sender address
  to: ["andywatson100500@gmail.com"], // list of receivers
  subject: "hello", // Subject line
  text: "hello", // plain text body
};
const sendMail = (transporter, info) => {
  try {
    transporter.sendMail(info);
    console.log("Sent mail");
  } catch (error) {
    console.log(error);
  }
};
sendMail(transporter, info);*/

app.get("/email", (req, res) => {
  res.send("email");
});
app.post("/email", (req, res) => {
  console.log(req.body);

  /*const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "tmsaadrayhan@gmail.com",
      pass: password,
    },
  });*/

  const transporter = nodemailer.createTransport({
    host: "mail.microbuddy.tech",
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
      user: "saad@microbuddy.tech",
      pass: process.env.AUTH_PASS,
    },
    tls: {
      rejectUnauthorized: true,
      minVersion: "TLSv1.2",
    },
    debug: true,
  });
  const info = {
    from: { name: "Saad", address: "saad@microbuddy.tech" }, // sender address
    to: [req.body.email], // list of receivers
    subject: req.body.subject, // Subject line
    text: req.body.message, // plain text body
  };
  const sendMail = async (transporter, info) => {
    try {
      await transporter.sendMail(info);
      console.log("Sent mail");
    } catch (error) {
      console.log(error);
    }
  };
  sendMail(transporter, info);
});

app.get("/", (req, res) => {
  res.send("microbuddy server is running");
});

app.listen(port, () => {
  console.log(`microbuddy server is running on port ${port}`);
});
