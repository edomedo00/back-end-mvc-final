const jwt = require('jsonwebtoken');
require('dotenv').config();

let validTokens = [];
let invalidatedTokens = [];

const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: 'No Token Provided'
    });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(401).json({
      message: 'Invalid Token Format'
    });
  }

  const tokenValue = tokenParts[1];

  if (invalidatedTokens.includes(tokenValue)) {
    return res.status(401).json({
      message: 'Invalid Token'
    });
  }

  if (!validTokens.includes(tokenValue)) {
    return res.status(401).json({
      message: 'No Token Provided'
    });
  }

  try {
    const validToken = jwt.verify(tokenValue, process.env.TOP_SECRET);
    req.userData = validToken;
    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Token'
    });
  }
};

const invalidateToken = (token) => {
  invalidatedTokens.push(token);
  console.log("Invalidated Tokens: ", invalidatedTokens)
};

const validateToken = (token) => {
  validTokens.push(token);
  console.log("valid Tokens: ", validTokens)
};

module.exports = {
  authMiddleware,
  invalidateToken,
  validateToken
};
