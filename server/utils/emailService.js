const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

exports.sendNotification = async ({ email, subject, text }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject,
      text
    };

    await transporter.sendMail(mailOptions);
    console.log(`Notification sent to ${email}`);
  } catch (err) {
    console.error('Error sending email:', err);
  }
};