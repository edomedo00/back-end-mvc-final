const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { createUser, findUserByEmail, getAllUsers, updateUser, deleteUser } = require('../models/user.model');
require('dotenv').config();

exports.createUser = async (userData) => {
  try {
    const createdUser = await createUser(userData);
    if (createdUser.success) {
      return {
        success: true
      };
    } 
    return {
      success: false,
      message: 'Registration error'
    };
  } catch (error) {
    throw new Error('Error creating user: ' + error.message);
  }
};

exports.findUserByEmail = async (email) => {
  try {
    const found = await findUserByEmail(email);
    if (found.success) {
      return {
        success: true,
        user: found.user
      };
    }
    return {
      success: false,
      message: 'User not found'
    };
  } catch (error) {
    throw new Error('Error finding user by email: ' + error.message);
  }
};

exports.comparePasswords = async (plainPassword, hashedPassword) => {
 try {
  const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword);
  return verifyPassword;
 } catch (error) {
  throw new Error('Error comparing passwords: ' + error.message);
 }
};

exports.generateToken = async (user) => {
  try {
    const token = jwt.sign({
      email: user.email,
      userId: user.id
    },
    process.env.SECRET,
    { expiresIn: '1h' }
    );
    return token;
  } catch (error) {
    throw new Error('Error generating token: ' + error.message);
  }
};
