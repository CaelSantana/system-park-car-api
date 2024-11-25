const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Token should be in format "Bearer TOKEN"
  if (!token) return res.status(401).json({ message: 'Token não fornecido' });

  jwt.verify(token, process.env.JWT_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.userId = user.id;
    req.userRole = user.role; // Include user role for later use
    next();
  });
};

module.exports = authenticateToken;