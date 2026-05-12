const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5*60*1000,
    max: 100,
    message: { error: 'Too many requests, try again later...' },
});

module.exports = limiter;
