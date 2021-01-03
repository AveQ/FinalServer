const mailer = require('./mailer');

exports.applicationNotify = (options) => {
    const defaultOptions = {
        subject: '[Sign up - NFL] Welcome!',
        view: 'application-notification'
    };
    return mailer.send(Object.assign(defaultOptions, options));
};