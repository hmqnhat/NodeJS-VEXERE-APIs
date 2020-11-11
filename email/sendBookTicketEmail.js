const nodemailer = require("nodemailer");
const hogan = require("hogan.js");
const fs = require;

module.exports.sendBookTicketEmail = () => {
  const transport = {
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    requireTLS: true,
    requireSSL: true,
    auth: {
      user: "nhatCybersoft@gmail.com",
      pass: "Quocnhat@277",
    },
  };

  const transporter = nodemailer.createTransport(transport);
  const mailOptions = {
    from: "nhatCybersoft@gmail.com",
    to: "huynhminhquocnhat@gmail.com",
    subject: "Vexere",
    text: "Chuc mung bal bla",
  };

  transporter.sendMail(mailOptions, (err) => {
    if (err) return console.log(err);
    console.log("Success !!");
  });
};
