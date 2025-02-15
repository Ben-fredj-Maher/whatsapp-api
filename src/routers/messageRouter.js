const express = require('express');
const router = new express.Router();
const { whatsappClient } = require('../services/WhatsappClient');


// Route de test
router.get('/', (req, res) => {
    res.send('Hello World');
});

// Route pour envoyer un message
router.post('/message', async (req, res) => {
    try {
        const { phoneNumber, message } = req.body;
        
        // Validation basique
        if (!phoneNumber || !message) {
            return res.status(400).send('Missing phoneNumber or message');
        }

        // Formatage du numéro
        const formattedNumber = phoneNumber.replace(/[^0-9]/g, '');
        const finalNumber = formattedNumber.includes('@c.us') 
            ? formattedNumber 
            : `${formattedNumber}@c.us`;

        // Envoi du message
        const response = await whatsappClient.sendMessage(finalNumber, message);
        console.log(`Message sent to: ${finalNumber}`);
        console.log(`Message content: ${message}`);
        console.log(`Message ID: ${response.id._serialized}`);
        
        res.status(200).json({
            success: true,
            messageId: response.id._serialized
        });
        
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).send('Error sending message');
    }
});

module.exports = router;
