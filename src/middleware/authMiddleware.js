const jwt = require('jsonwebtoken')
require('dotenv').config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({
            message: 'No Token Provided'
        })
    }

    // Verificar si el token está en el formato esperado: Bearer token_value
    const tokenParts = token.split(' ');
    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        return res.status(401).json({
            message: 'Invalid Token Format'
        })
    }

    const tokenValue = tokenParts[1]
    try {
        // Verificar y decodificar el token JWT
        const decodedToken = jwt.verify(tokenValue, process.env.TOP_SECRET);
        
        // Asignar los datos del usuario decodificados a req.userData
        req.userData = decodedToken;

        // Llamar al siguiente middleware en la cadena de middleware
        next();
    } catch (error) {
        // Manejar errores durante la verificación del token
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }
}

module.exports = authMiddleware