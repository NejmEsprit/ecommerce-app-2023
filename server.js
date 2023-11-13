import express from 'express'
import colors from'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authRoute from './routes/authRoute.js'
import categoryRoute from './routes/categoryRoute.js'
import productRoute from './routes/productRoute.js'
import cors from 'cors'
// configure env 
dotenv.config()
//database config 
connectDB()
 
// rest object 
const app = express()

//middelwares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

//routes
app.use("/api/auth", authRoute)
app.use("/api/category", categoryRoute)
app.use("/api/product", productRoute)

app.get('/', (req, res) => {
    res.send("<h1> welcome to ecommerce MERN Stack app 2023 </h1>")
})

const PORT = process.env.PORT || 8080;

// run listen 
app.listen(PORT,()=>{
    console.log(`server running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan.white)
})