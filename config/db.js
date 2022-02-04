const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true
        });

        console.log('MongoDB connectée');
    } catch (err) {
        console.log(err.message);

        // Sortie de la procédure avec un raté
        process.exit(1);
    }
};

module.exports = connectDB;