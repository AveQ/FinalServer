// const https = require('https');
// const app = require('./app');
// const fs = require('file-system');

// const port = process.env.PORT || 3000;

// const options = {
//     key: fs.readFileSync(__dirname + '/ssl/key.pem'),
//     cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
// };

// const server = https.createServer( options, app);

// server.listen(port);

const https = require('https');
const app = require('./app');
const port = process.env.PORT || 3000;
const fs = require('file-system');

const options = {
    key: fs.readFileSync(__dirname + '/ssl/key.pem'),
    cert: fs.readFileSync(__dirname + '/ssl/cert.pem'),
};

https.createServer(options, app)
    .listen(port, () => {
        console.log(`[Server] Server is running at https://localhost:${port}`);
    });
