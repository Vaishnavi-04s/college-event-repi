const nodemailer = require('nodemailer');
const User = require('../models/User');

const sendPersonalizedEmails = async (event) => {
  try {
    const users = await User.find({ tags: { $in: event.tags } });

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'srisindhugangula123@gmail.com',     // Replace with your email
        pass: 'zpng kpqn idaz mnjs'         // Use app password if 2FA is on
      }
    });

    for (const user of users) {
      const mailOptions = {
        from: 'srisindhugangula123@gmail.com',
        to: user.email,
        subject: `New Event Matching Your Interests: ${event.name}`,
        text: `Hello ${user.name},\n\nThere's a new event you might be interested in: "${event.name}"\n\nDescription: ${event.description}\nDate: ${event.date}\nLocation: ${event.location}\n\nVisit the app for more details!`
      };

      await transporter.sendMail(mailOptions);
    }

    console.log('Notifications sent successfully!');
  } catch (err) {
    console.error('Failed to send notifications:', err);
  }
};
