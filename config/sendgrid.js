const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.API_KEY_EMAIL);

const message = {};
message.from = 'martinpie10@gmail.com';
message.mail_settings = {
    sandbox_mode: {
        enable: false
    }
};

exports.message = message;