const express = require('express')
const dotenv = require('dotenv')
const userRoute = require('./router/userRouter')
const connectDatabase = require('./config/database')
const app = express()


dotenv.config()

app.use(express.json())

app.use('/api',userRoute)

connectDatabase()

const PORT = process.env.PORT || 5000


app.listen(PORT, ()=>{
    console.log(`app listening on port ${PORT}`)
})  



