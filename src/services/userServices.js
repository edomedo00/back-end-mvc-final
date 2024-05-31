  const bcrypt = require('bcrypt')
  const jwt = require('jsonwebtoken')
  const { createUser, findUserByEmail, getAllUsers, deleteUser, updateUser } = require('../models/userModel')
  require('dotenv').config()

  exports.createUser = async (userData) => {
    // console.log('@@ userData => ', userData)
    try {
      const createdUser = await createUser(userData)
      // console.log('@@@ service => ', createdUser)
      if (createdUser.success) {
        return {
          success: true
        }
      }
      return {
        success: false,
        message: 'Error al registrar'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  exports.findUserByEmail = async (email) => {
    try {
      const found = await findUserByEmail(email)
      if (found.success) {
        return {
          success: true,
          user: found.user
        }
      }
      return {
        success: false,
        message: 'Usuario No Encontrado'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  exports.comparePasswords = async (plainPassword, hashedPassword) => {
    try {
      const verifyPassword = await bcrypt.compare(plainPassword, hashedPassword)
      return verifyPassword
    } catch (error) {
      throw new Error('Error al comparar passwords')
    }
  }

  exports.generateToken = async (user) => {
    try {
      const token = jwt.sign({
          email: user.email,
          userId: user.id
        },
        process.env.TOP_SECRET,
        { expiresIn: '1h' }
      )
    } catch (error) {
      throw new Error('Error al generar el token')
    }
  }

  exports.getAllUsers = async () => {
    try {
      const users = await getAllUsers()
      return users
    } catch (error) {
      throw new Error('Error Getting Users: ' + error.message)
    }
  }

  exports.deleteUser = async (userId) => {
    try {
      await deleteUser(userId)
    } catch (error) {
      throw new Error('Error Deliting user' + error.message)
    }
  }

  exports.updateUser = async (userId, userData) => {
    try {
      await updateUser(userId, userData)
    } catch (error) {
      throw new Error('Error Updating user' + error.message)
    }
  }