const jwt = require('jsonwebtoken');
const JWT_SECRET = "Shravaniisagood$girl"; 
const fetchUser = (req, res, next) => {
 
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET)
    req.user = decoded.user;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

module.exports = fetchUser;
