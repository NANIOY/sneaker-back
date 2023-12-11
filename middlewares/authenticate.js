// // middlewares/authenticate.js
// const jwt = require('jsonwebtoken');

// const authenticate = (req, res, next) => {
//     const token = req.headers.authorization;

//     if (!token) {
//         return res.status(401).json({ status: 'error', message: 'Unauthorized: Missing token' });
//     }

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);

//         // Check if the user is an admin
//         if (!decoded.isAdmin) {
//             return res.status(403).json({ status: 'error', message: 'Forbidden: Admin access required' });
//         }

//         req.user = decoded;
//         next();
//     } catch (error) {
//         return res.status(401).json({ status: 'error', message: 'Unauthorized: Invalid token' });
//     }
// };

// module.exports = authenticate;
