const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const admin = req.headers.admin;
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        if (admin === 'true') {
            next();
        } else {
            return res.status(401).json({
                massage: 'Auth failed'
            });
        }
    } catch {
        return res.status(401).json({
            massage: 'Auth failed'
        });
    }
};