const express = require('express');
const router = express.Router();

// @route       GET api/profile
// @desc        Route test
// @access      Public
router.get('/', (req, res) => res.send('Route profil'));

module.exports = router;