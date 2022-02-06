const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       GET api/profile/me
// @desc        Récupération du profile de l'utilisateur en cours
// @access      Private
router.get('/me', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id }).populate('user',
            ['name', 'avatar']);

        if (!profile) {
            return res.status(400).json({ msg: "Cet utilisateur n'a pas de profil .." });
        }

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur ..');
    }
});

// @route       POST api/profile
// @desc        Créer ou mettre à jour un profil d'utilisateur
// @access      Private
router.post('/', [auth, [
    check('status', 'Le statut doit être renseigné').not().isEmpty(),
    check('skills', 'Les compétences doivent être renseignées').not().isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Récupération de tous ces champs depuis le corps de la requête
        const {
            company,
            website,
            location,
            bio,
            status,
            githubusername,
            skills,
            youtube,
            facebook,
            twitter,
            instagram,
            linkedin
        } = req.body;

        // Construction de l'objet Profile
        const profileFields = {};
        profileFields.user = req.user.id;
        if (company) profileFields.company = company;
        if (website) profileFields.website = website;
        if (location) profileFields.location = location;
        if (bio) profileFields.bio = bio;
        if (status) profileFields.status = status;
        if (githubusername) profileFields.githubusername = githubusername;
        if (skills) {
            profileFields.skills = skills.split(',').map(skills => skills.trim());
        }

        // Construction de l'objet Social
        profileFields.social = {};
        if (youtube) profileFields.social.youtube = youtube;
        if (twitter) profileFields.social.twitter = twitter;
        if (facebook) profileFields.social.facebook = facebook;
        if (linkedin) profileFields.social.linkedin = linkedin;
        if (instagram) profileFields.social.instagram = instagram;

        try {
            let profile = await Profile.findOne({ user: req.user.id });

            if (profile) {
                // Mise à jour (si un profil existe)
                profile = await Profile.findOneAndUpdate(
                    { user: req.user.id },
                    { $set: profileFields },
                    { new: true }
                );

                return res.json(profile);
            }

            // Création (si aucun profil n'éxiste)
            profile = new Profile(profileFields);

            await profile.save();
            res.json(profile);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erreur serveur');
        }

    });

// @route       GET api/profile
// @desc        Récupération de tous les profils
// @access      Public
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find().populate('user', ['name', 'avatar']);
        res.json(profiles);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// @route       GET api/profile/user/:user_id
// @desc        Récupération d'un profil par ID
// @access      Public
router.get('/user/:user_id', async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.params.user_id }).populate('user', ['name', 'avatar']);

        if (!profile) return res.status(400).json({ msg: "Aucun profil n'a été pour cet utilisateur.." });

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        // On vérifie le type d'erreur. S'il s'agit d'un id correct mais inexistant alors 'Aucun profil n'a été pour cet utilisateur..'
        if (err.kind == 'ObjectID') {
            if (!profile) return res.status(400).json({ msg: "Aucun profil n'a été pour cet utilisateur.." });
        }
        // S'il s'agit d'un id incorrect (e.g :mauvais nombre de caractères) 'Erreur serveur'
        res.status(500).send('Erreur serveur');
    }
});

// @route       DELETE api/profile
// @desc        Suppression d'un profil, de l'utilisateur et de ses posts
// @access      Public
router.delete('/', auth, async (req, res) => {
    try {
        // @TODOP - Supprimer les posts de l'utilisateur

        // Suppression du profil
        await Profile.findOneAndRemove({ user: req.user.id });

        // Suppression de l'utilisateur
        await User.findOneAndRemove({ _id: req.user.id });

        res.json({ msg: 'Utilisateur supprimé ' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// @route       PUT api/profile/experience
// @desc        Ajout des expériences au profil
// @access      Private
router.put('/experience', [auth, [
    check('title', "Le titre doit être renseigné")
        .not()
        .isEmpty(),
    check('company', "L'entreprise doit être renseignée")
        .not()
        .isEmpty(),
    check('from', "La date d'embauche doit être renseignée")
        .not()
        .isEmpty(),
]], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Récupération de tous ces champs depuis le corps de la requête
    const {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    } = req.body;

    const newExp = {
        title,
        company,
        location,
        from,
        to,
        current,
        description
    };

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        profile.experience.unshift(newExp);
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }

});

// @route       DELETE api/profile/experience/exp_id
// @desc        Suppression des expériences du profil
// @access      Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
    try {
        // Récupération du profil de l'utilisateur
        const profile = await Profile.findOne({ user: req.user.id });

        // Récupération de l'index de l'éxpérience à supprimer
        const removeIndex = profile.experience.map(item => item.id).indexOf(req.params.exp_id);

        // Suppression de l'éxpérience en question
        profile.experience.splice(removeIndex, 1);

        // Sauvegarde du profil
        await profile.save();

        // Réponse
        res.json(profile);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur ');
    }
});


module.exports = router;