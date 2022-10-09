const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
  const {
    authorization,
  } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Please, provide authorization header', status: 401 });
  }

  const [, token] = authorization.split(' ');

  if (!token) {
    return res.status(401).json({ message: 'Please, include token to request', status: 401 });
  }

  try {
    const tokenPayload = jwt.verify(token, process.env.SECRET_KEY);
    req.user = {
      userId: tokenPayload.userId,
      surname: tokenPayload.role,
      email: tokenPayload.email,
      createdDate: tokenPayload.createdDate,
      name: tokenPayload.name,
      method: tokenPayload.method,
      facebookID: tokenPayload.facebookID,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: err.message, status: 401 });
  }
};

module.exports = {
  authMiddleware,
};
