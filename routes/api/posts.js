const express = require('express');
const router = express.Router();

// @route       GET api/posts
// @desc        Route test
// @access      Public
router.get('/', (req, res) => res.send('Route postes'));

module.exports = router;