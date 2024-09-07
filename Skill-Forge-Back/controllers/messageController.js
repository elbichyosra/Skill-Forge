// controllers/messageController.js
const nodemailer = require('nodemailer');
const Message = require('../models/message');
require('dotenv').config();

// Email Transporter
const transporter = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.EMAIL_PORT,
  secure: true,
  auth: {
    user: process.env.SENDER_MAIL,
    pass: process.env.SENDER_PASS,
  },
});

// Send Message and Save to Database
exports.sendMessage = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Save to Database
  const newMessage = new Message({
    name,
    email,
    subject,
    message,
  });

  try {
    await newMessage.save();

    // Email content
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: process.env.SENDER_MAIL,
      subject: `Contact Form: ${subject}`,
      text: message,
      html: `<h3>You have a new message from:</h3>
             <p><b>Name:</b> ${name}</p>
             <p><b>Email:</b> ${email}</p>
             <p><b>Message:</b></p><p>${message}</p>`,
    };

    // Send Email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return res.status(500).json({ success: false, message: 'Email not sent!' });
      }
      res.status(200).json({ success: true, message: 'Email sent successfully!' });
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error saving message' });
  }
};
