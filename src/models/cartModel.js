const firebase = require('../config/firebase')
const cartsCollection = firebase.firestore().collection("carts")

exports.createCart = async (cartData) => {
  try {
		const cart = await cartsCollection.doc(cartData.id).set(cartData)
		// console.log('@@ modelo => ', user)
		return {
			success: true
		} 
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.findCartById = async (cartId) => {
	try {
		const cartFound = await cartsCollection.doc(cartId).get()
		if (cartFound.exists) {
			return {
				success: true,
				user: cartFound.data()
			}
		} else {
			return {
				success: false,
				error: 'Cart not Found'
			}
		}
	} catch (error) {
		return {
			success: false,
			error: error.message
		}
	}
}

exports.getCart = async (cartID) => {
	try {
    const cart = this.findCartById(cartID)
		return cart
	} catch (error) {
		throw new Error('Error getting cart: ' + error.message)
	}
}

exports.deleteCart = async (cartID) => {
	try {
		await cartsCollection.doc(cartID).delete()
	} catch (error) {
		throw new Error('Error deleting cart' + error.message)
	}
}


////// Update pending
exports.updateUser = async (userId, userData) => {
	try {
		await usersCollection.doc(userId).update(userData)
	} catch (error) {
		throw new Error('Error updating user' + error.message)
	}
}