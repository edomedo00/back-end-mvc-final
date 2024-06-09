require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express')
const cors = require('cors')
const routes = require('./routes/routes')
const app = express()
const PORT = 6010

app.use(cors())
app.use(express.json())

app.use('/', routes)

app.listen(PORT, () => {
    console.log(`Server running in: ${PORT}`)
})
