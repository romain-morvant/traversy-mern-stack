const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route       POST api/users
// @desc        Ajout d'un utilisateur
// @access      Public
router.post('/', [
    check('name', 'Merci de renseigner votre nom')
        .not()
        .isEmpty(),
    check('email', 'Merci de renseigner votre email').isEmail(),
    check('password', 'Merci de choisir un MDP de 6 caractères ou plus').isLength({ min: 6 })

], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Déstructuration du req.body
    const { name, email, password } = req.body;

    try {
        // Vérification de l'éxistence de l'user
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ errors: [{ msg: "L'utilisateur éxiste déjà .." }] });
        }
        // Récupération du gravatar (basé sur l'email) de l'user
        const avatar = gravatar.url(email, {
            s: '200', // s = size
            r: 'pg', // r = rating
            d: 'mm' // d = default
        });

        user = new User({
            name,
            email,
            avatar,
            password
        });
        // Encryptage du mot de passe
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

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