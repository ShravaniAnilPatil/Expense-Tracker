// const jwt = require('jsonwebtoken');

// const authenticateToken = (req, res, next) => {
//   const token = req.header('Authorization')?.split(' ')[1]; // Extract token from Authorization header

//   if (!token) {
//     return res.status(401).json({ error: 'No token provided' });
//   }

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET); // Replace with your JWT secret
//     req.user = decoded; // Attach user to request object
//     next(); // Proceed to the next middleware/route handler
//   } catch (err) {
//     res.status(401).json({ error: 'Invalid or expired token' });
//   }
// };

// module.exports = authenticateToken;
