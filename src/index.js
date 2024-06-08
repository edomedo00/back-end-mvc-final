require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')
const app = express()
const PORT = 6010

app.use(cors())
app.use(express.json())

app.use('/', authRoutes)

app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})
