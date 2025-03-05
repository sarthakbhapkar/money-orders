const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.MAILHOG_HOST || 'localhost',
    port: process.env.MAILHOG_PORT || 1025,
    secure: false,
});

async function sendEmail(to, subject, text) {
    try {
        await transporter.sendMail({
            from: '"Money Orders" <no-reply@money-orders.com>',
            to: to,
            subject: subject,
            text: text,
        });
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

module.exports = {
    sendEmail
};
