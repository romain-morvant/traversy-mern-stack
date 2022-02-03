const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

// @route       POST api/users
// @desc        Ajout d'un utilisateur
// @access      Public
router.post('/', [
    check('name', 'Merci de renseigner votre nom')
        .not()
        .isEmpty(),
    check('email', 'Merci de renseigner votre email').isEmail(),
    check('password', 'Merci de choisir un MDP de 6 caractères ou plus').isLength({ min: 6 })

], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    res.send('User route');
}
);

module.exports = router;