const nodemailer = require("nodemailer");
const smtpPool = require('nodemailer-smtp-pool');


exports.transporter = nodemailer.createTransport(smtpPool({
  // host: "smtp.gmail.com",
  // port: 587,
  // secure: false,
  // requireTLS: true,
  service: 'gmail',
  auth: {
    user: process.env.MAILER_ID,
    pass: process.env.MAILER_PASSWORD,
  },
  maxConnections: 5,
  maxMessages: 100
}));
