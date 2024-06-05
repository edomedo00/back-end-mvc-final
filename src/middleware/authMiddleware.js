const jwt = require('jsonwebtoken');
const redisClient = require('../config/redisClient');
require('dotenv').config();

// const client = redis.createClient();

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
  console.log(tokenValue)

  try {

    const isBlacklisted = await redisClient.get(tokenValue);
    console.log("yeah")

    if (isBlacklisted) {
      return res.status(401).json({
        message: 'Token is blacklisted'
      });
    }

    const decodedToken = jwt.verify(tokenValue, process.env.TOP_SECRET);
    req.userData = decodedToken;

    next();
  } catch (error) {
    return res.status(401).json({
      message: 'Invalid Token'
    });
  }
  // try {
  //     const validToken = jwt.verify(tokenValue, process.env.TOP_SECRET)
  //     req.userData = validToken
  //     next()
  // } catch (error) {
  //     return res.status(401).json({
  //         message: 'Invalid Token'
  //     })
  // }
};

module.exports = authMiddleware;