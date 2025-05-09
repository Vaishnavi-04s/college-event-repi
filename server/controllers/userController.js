const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: '5d' },
      (err, token) => {
        if (err) throw err;

        // Omit password before sending user object
        const { password, ...userWithoutPassword } = user.toObject();

        res.json({
          token,
          user: userWithoutPassword
        });
      }
    );
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};
