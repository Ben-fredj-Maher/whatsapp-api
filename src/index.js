const express = require('express');
const messageRouter = require('./routers/messageRouter');
const { initializeClient } = require('./services/WhatsappClient'); // Assure-toi que l'importation est correcte

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(messageRouter);

// Gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Initialisation du client WhatsApp et démarrage du serveur
const initializeApp = async () => {
    try {
        await initializeClient(); // Initialisation du client WhatsApp
        app.listen(3001, () => console.log('Server is ready!'));
    } catch (error) {
        console.error('Failed to initialize:', error);
        process.exit(1);
    }
};

initializeApp();
