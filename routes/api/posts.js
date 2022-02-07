const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route       POST api/posts
// @desc        Créer un post
// @access      Private
router.post('/', [auth, [
    check('text', 'Le texte est requis')
        .not()
        .isEmpty()
]],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const user = await User.findById(req.user.id).select('-password');

            const newPost = new Post({
                text: req.body.text,
                name: user.name,
                avatar: user.avatar,
                user: req.user.id
            });

            const post = await newPost.save();

            res.json(post);

        } catch (err) {
            console.error(err.message);
            res.status(500).send('Erreur serveur');
        }
    });

// @route    GET api/posts
// @desc     Récupérer tous les posts
// @access   Private
router.get('/', auth, async (req, res) => {
    try {
        const posts = await Post.find().sort({ date: -1 });
        res.json(posts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Erreur serveur');
    }
});

// @route       GET api/posts/:id
// @desc        Récupérer un post via son ID
// @access      Private
router.get('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Article introuvable ..' });
        }

        res.json(post);

    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectID') {
            return res.status(404).json({ msg: 'Article introuvable ..' });
        }
        res.status(500).send('Erreur serveur');
    }
});

// @route    DELETE api/posts/:id
// @desc     Supprimer un post
// @access   Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) {
            return res.status(404).json({ msg: 'Article introuvable ..' });
        }

        // Vérification de l'utilisateur (Seul le propriétaire du post doit pouvoir le supprimer)
        if (post.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Utilisateur non autorisé' });
        }

        await post.remove();

        res.json({ msg: 'Article supprimé' });
    } catch (err) {
        console.error(err.message);
        if (err.kind === 'ObjectID') {
            return res.status(404).json({ msg: 'Article introuvable ..' });
        }
        res.status(500).send('Erreur serveur');
    }
});

module.exports = router;