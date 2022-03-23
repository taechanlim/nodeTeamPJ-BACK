const express = require('express')
const app = express()
const pool = require('./db').pool
const cors = require('cors')

app.use(express.json())
app.use(express.urlencoded({extended:true,}))

app.use(cors({
    origin:true,
    credentials:true,
}))

app.post('/api/board/list',(req,res)=>{
    const response = {
        result:[]
    }
    res.json(response)
    console.log(response)
})

app.listen(4001,()=>{
    console.log('서버시작 4001')
})