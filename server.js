const cookieParser = require('cookie-parser')
const express = require('express')
const dbConnection = require('./database/mongo.connection')
require('dotenv').config()

// Route Imports
const authRoutes = require('./routes/Auth')
const adminRoutes = require('./routes/Admin')
const patientRoutes = require('./routes/Patient')

const app = express()
const PORT = process.env.PORT || 9000

// Middlewares
app.use(require('cors')()) // CORS
app.use(express.json()) // Parse JSON bodies
app.use(cookieParser()) // Access Cookie

// Routes
app.use('/api/v1/auth',authRoutes)
app.use('/api/v1/admin',adminRoutes)
app.use('/api/v1/patient',patientRoutes)

// Server
try {
    app.listen(PORT,()=>{
        dbConnection()
        console.log(`Server started at PORT ${PORT}...`);
    })
} catch (error) {
    console.log("Server faild to start.",error);
}