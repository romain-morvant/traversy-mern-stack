const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
    // Récupération du token depuis le header
    const token = req.header('x-auth-token');

    // Vérification de la présence d'un token
    if (!token) {
        return res.status(401).json({ msg: "Pas de token, accès refusé .." });
    }

    // Vérifier le token, s'il y en a un
    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'));

        req.user = decoded.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: "Le token n'est pas valide .." });
    }
};