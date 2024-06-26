const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail } = require('../services/userServices');
const { invalidateToken, validateToken} = require('../middleware/authMiddleware');
require('dotenv').config();

exports.signup = async (req, res) => {  
  try {
    const { email, password, id } = req.body;
    const existingUser = await findUserByEmail(email);
    if (existingUser.success) {
      return res.status(400).json({
        message: 'El usuario ya esta registrado'
      });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = {
      email: email,
      password: hashedPassword,
      id: id
    };

    const userResult = await createUser(newUser);
    if (userResult.success) {
      res.status(201).json({
        message: 'Usuario Registrado Satisfactoriamente'
      });
    } else {
      res.status(500).json({
        message: 'Error al registrar usuario'
      });
    }
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findEmail = await findUserByEmail(email);

    if (!findEmail.success) {
      return res.status(401).json({
        message: 'Usuario no encontrado'
      });
    }
    const user = findEmail.user;
    const findPassword = await bcrypt.compare(password, user.password);

    if (!findPassword) {
      return res.status(401).json({
        message: 'Password Incorrecto'
      });
    }

    const token = jwt.sign({
      email: user.email,
      userId: user.id
    }, process.env.TOP_SECRET, {
      expiresIn: '1h'
    });
    validateToken(token);
    res.status(200).json({
      token: token
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

exports.logout = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(400).json({
      message: 'No Token Provided'
    });
  }

  const tokenParts = token.split(' ');
  if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
    return res.status(400).json({
      message: 'Invalid Token Format'
    });
  }

  const tokenValue = tokenParts[1];
  
  invalidateToken(tokenValue);
  
  res.status(200).json({
    message: 'Logout successful'
  });
};


