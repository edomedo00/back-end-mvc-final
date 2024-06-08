require('dotenv').config({ path: __dirname + '/.env' });

const express = require('express')
const cors = require('cors')

const authRoutes = require('./routes/authRoutes')
const cartRoutes = require('./routes/cartRoutes');
const productRoutes = require('./routes/productRoutes');

const app = express()
const PORT = 6010

app.use(cors())
app.use(express.json())

// Usar las rutas de autenticación
app.use('/api/auth', authRoutes);

// Usar las rutas del carrito
app.use('/api/cart', cartRoutes);

// Usar las rutas de productos
app.use('/api/product', productRoutes);

app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})
