const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
<<<<<<< HEAD
require('dotenv').config();

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validate role input
    const allowedRoles = ['user', 'organizer'];
    if (!role || !allowedRoles.includes(role)) {
      return res.status(400).json({ msg: 'Invalid role. Role must be either user or organizer.' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Create new user with role
    user = new User({ name, email, password, role });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Save user
    await user.save();

    // Flattened JWT payload here:
    const payload = { userId: user._id, role: user.role };

    // Sign token and respond
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(201).json({ token, user: userWithoutPassword });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

=======
const nodemailer = require('nodemailer');
require('dotenv').config();

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

<<<<<<< HEAD
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Flattened JWT payload here as well:
    const payload = { userId: user._id, role: user.role };

    // Sign token and respond
=======
    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Create JWT payload
    const payload = { user: { id: user.id } };

    // Sign token
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;
<<<<<<< HEAD
        const { password, ...userWithoutPassword } = user.toObject();
        res.status(200).json({ token, user: userWithoutPassword });
=======

        // Omit password before sending user object
        const { password, ...userWithoutPassword } = user.toObject();

        res.json({
          token,
          user: userWithoutPassword
        });
>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
      }
    );
  } catch (err) {
    console.error(err);
<<<<<<< HEAD
    res.status(500).json({ msg: 'Server error' });
  }
};
=======
    res.status(500).json({ error: 'Server error' });
  }
};

>>>>>>> f8a27351c7c780de484c270ab4593b3dd9588587
