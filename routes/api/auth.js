const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

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
        res
            .status(500)
            .send('Erreur serveur ..');
    }
});

// @route       POST api/auth
// @desc        Authentification de l'user & récupération de son token
// @access      Public
router.post('/', [
    check('email', 'Merci de renseigner votre email.').isEmail(),
    check('password', 'Le mot de passe est requis.').exists()

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Déstructuration du req.body
    const { email, password } = req.body;

    try {
        // Vérification de l'éxistence de l'user
        let user = await User.findOne({ email });

        if (!user) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Paramètres incorrects." }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res
                .status(400)
                .json({ errors: [{ msg: "Paramètres incorrects." }] });
        }

        // Que ce soit l'utilisateur ou le mot de passe saisi qui est invalide, le message renvoyé est le même afin de ne pas donner d'indication sur l'éxistence ou non de l'utilisateur

        // Renvoi du JWT (jsonwebtoken)
        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
                ;
            });

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Erreur serveur ..');
    }
}
);

module.exports = router;