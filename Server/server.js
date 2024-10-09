require('dotenv').config()
const express = require('express')
const cors=require('cors')
const app = express()
const dbConn = require('./config/db')
const authRoutes = require('./routes/userRoute');
const debateRoutes = require('./routes/debateRoutes'); 
const regRoutes = require('./routes/regRoutes'); 
app.use(express.json())


app.use(cors())
const port = process.env.PORT || 7778
app.use('/api/auth', authRoutes);
app.use('/api/debates', debateRoutes); 
app.get('/', (req, res) => {
    res.status(400).json("Welcome")
})

app.listen(port, () => {
    console.log(`Server running in  http://localhost:${port}`)
})