const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const router = require('./routes/index.js');
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(express.static('./uploads'))
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true,
}))


app.use(router);




app.listen(4001,()=>{
    console.log('서버시작 4001')
})