const nodemailer = require("nodemailer");

// Create a test account or replace with real credentials.
const mailSender = async (email,title ,body) => {
    try{
    const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    },
    });

// Wrap in an async IIFE so we can use await.
        const info = await transporter.sendMail({
        from: `"TechAscend" <${process.env.MAIL_USER}>`,
        to: `${email}`,
        subject: `${title}`,
        html: `${body}`, // HTML body
        });
        // console.log("Message sent:", info.messageId);
    return info;
    }catch(error){
        console.log(error.message);
    }
}

module.exports = mailSender;