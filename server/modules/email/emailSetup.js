require('dotenv').config();
const nodemailer = require("nodemailer");
const { MailtrapTransport } = require("mailtrap");

// console.log("MAILTRAP_HOST:", process.env.MAILTRAP_HOST);
// console.log("MAILTRAP_PORT:", process.env.MAILTRAP_PORT);
// console.log("MAILTRAP_USER:", process.env.MAILTRAP_USER);
const transport = nodemailer.createTransport({
  host: process.env.MAILTRAP_HOST,
  port: process.env.MAILTRAP_PORT,
  auth: {
    user: process.env.MAILTRAP_USER,
    pass: process.env.MAILTRAP_PASS
  }
});

const sendEmail = async (to, subject, html) => {
    try {
        await transport.sendMail({
            from: process.env.EMAIL_USER,
            to,
            subject,
            html,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error(`Error sending email: ${error.message}`);
        throw new Error(`Failed to send email: ${error.message}`);
    }
}

module.exports = sendEmail;
