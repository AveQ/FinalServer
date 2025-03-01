const sgMail = require('@sendgrid/mail');
const sgConfig = require('../config/sendgrid');
// wygenerowanie kodu html za pomoca szablonu
const pug = require('pug');
const { render } = require('../app');

exports.send = async (options) => {
    Object.assign(sgConfig.message, {
        to: options.email,
        subject: options.subject,
        html: render(options.vew, options.data)
    });
    return await sgMail.send(sgConfig.message);
};

function render(filename, data) {
    return pug.renderFile(`${__dirname}/../views/emails/${filename}.pug`, data);
}