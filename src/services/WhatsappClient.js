const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Création d'un client WhatsApp
const whatsappClient = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { 
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    }
});

// Gestion du QR Code lors de la première authentification
whatsappClient.on("qr", (qr) => {
    console.log('Scan this QR code in WhatsApp!');
    qrcode.generate(qr, { small: true });
});

// Événement lorsque le client est prêt
whatsappClient.on("ready", () => {
    console.log("Client is ready!");
});

// Événement lorsque le message est reçu
whatsappClient.on('message', (message) => {
    console.log(`Message received from: ${message.from}`);
    console.log(`Message content: ${message.body}`);
    console.log(`Message ID: ${message.id._serialized}`);
});

// Authentification réussie
whatsappClient.on("authenticated", () => {
    console.log("Authentication successful!");
});

// Gestion de l'échec de l'authentification
whatsappClient.on("auth_failure", (msg) => {
    console.error("Authentication failure:", msg);
});

// Initialisation du client WhatsApp
const initializeClient = async () => {
    await whatsappClient.initialize();
};

module.exports = { whatsappClient, initializeClient };
