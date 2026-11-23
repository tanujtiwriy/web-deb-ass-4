const express = require('express');
const User = require('../models/User');
const { authenticate, authorizeRoles } = require('../middleware/auth');

const router = express.Router();

// RBAC demo: sirf admin users ki list dekh sakta hai
router.get('/users', authenticate, authorizeRoles('admin'), async (req, res) => {
  res.json(await User.find().select('-password'));
});

module.exports = router;