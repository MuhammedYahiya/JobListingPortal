const express = require('express')
const dotenv = require('dotenv')
const userRout = require('./router/userRouter')
const connectDatabase = require('./config/database')
const app = express()


dotenv.config()

app.use('/api',userRout)

connectDatabase()

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`)
})  



