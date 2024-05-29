const express = require('express');
const router = express.Router();
const session = require('express-session');
require('dotenv').config();

router.post('/auth/logout', (req, res) => {
   req.session.destroy(err => {
      if (err) {
         console.error('Error destroying session:', err);
         res.status(500).json({ message: 'Error during logout' });
      } else {
         res.clearCookie('kee');
         res.status(200).json({ message: 'Logged out successfully' });
         console.log('Logged out successfully');
      }
   });
});

module.exports = router;