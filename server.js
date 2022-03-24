const express = require('express')
const pool = require('./db').pool
const cors = require('cors')
const cookieParser = require('cookie-parser')
const {createToken} = require('./utils/jwt')
const { Auth } = require('./middlewares/auth')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true,}))
app.use(cookieParser())
app.use(cors({
    origin:true,
    credentials:true,
}))
app.use(Auth)


app.post('/api/user/join',async (req,res)=>{
    console.log(req.body)
    const {userid,userpw,profile_img,username,nickname,address,gender,telephone,phonenumber,email,introduce,level,active,point} = req.body
    const sql = `INSERT INTO user(
            userid,
            userpw,
            profile_img,
            username,
            nickname,
            address,
            gender,
            telephone,
            phonenumber,
            email,
            introduce
        ) values(
            ?,?,?,?,?,?,?,?,?,?,?
        )`
    const prepare = [userid,userpw,profile_img,username,nickname,address,gender,telephone,phonenumber,email,introduce]
    
    try{
        const [result] = await pool.execute(sql,prepare) 
        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
        res.setHeader('Set-cookie',`name=${nickname}; path=/; Domain=localhost;`)
        res.cookie('name',`${nickname}`,{
            path:'/',
            httpOnly:true,
            secure:true,
            domain:'localhost'
        })
        res.json(response) 
        
    
        }catch(e){
        console.log(e.message)
        const response = {
            result:{
                row:0,
                id:0
            },
            errno:1,
        }
        res.json(response)
        }
    
    })
    


app.post('/api/user/login',(req,res)=>{
    const postman = req.body
    console.log(JSON.parse(postman))
})

app.listen(4001,()=>{
    console.log('서버시작 4001')
})