const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY || "secret";

const generateToken = (id, username) => {
    return jwt.sign({ id, username }, SECRET_KEY, { expiresIn: '1h' });
};

module.exports = { generateToken };
