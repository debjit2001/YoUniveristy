const nodemailer = require("nodemailer");

exports.transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MAILER_ID,
    pass: process.env.MAILER_PASSWORD,
  },
});
