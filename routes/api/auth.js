const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

// @route       GET api/auth
// @desc        Route test
// @access      Public
router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password'); // .select('-password) permet de ne pas renvoyer le mot de passe
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur ..');
    }
});

module.exports = router;