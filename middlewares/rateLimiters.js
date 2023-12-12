const rateLimit = require('express-rate-limit');

// rate limit configuration for login attempts
const loginLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 5, // 5 requests per windowMs
    message: 'Too many login attempts from this IP, please try again later.',
});

// rate limit configuration for new user creation
const createUserLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 1, // 1 requests per windowMs
    message: 'Too many new user creation attempts from this IP, please try again later.',
});

// rate limit configuration for posting shoes
const createShoeLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 1 hour
    max: 2, // 2 requests per windowMs
    message: 'Too many new shoe creation attempts from this IP, please try again later.',
});

module.exports = {
    loginLimiter,
    createUserLimiter,
    createShoeLimiter,
};
