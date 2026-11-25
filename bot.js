const { Client, LocalAuth } = require('whatsapp-web.js');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { args: ['--no-sandbox', '--disable-setuid-sandbox'] }
});

client.on('ready', () => console.log('Bot udah online!'));

client.on('message', async (msg) => {
    if (msg.body.startsWith('!ai ')) {
        try {
            const prompt = msg.body.replace('!ai ', '');
            const result = await model.generateContent(`Kamu adalah teman asik yang suka anime. Jawab dengan bahasa Indonesia santai, gaul, jangan kaku: ${prompt}`);
            msg.reply(result.response.text());
        } catch (e) {
            msg.reply('Waduh AI nya lagi error bentar, coba lagi ya');
        }
    }
});

client.initialize();
