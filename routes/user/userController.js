const pool = require('../../Database/db.js').pool
const {createToken} = require('../../utils/jwt')
const {alertMove} = require('../../utils/alert.js')

exports.join = async (req,res)=>{
    const {userid,userpw,username,nickname,address,gender,telephone,phonenumber,email,introduce} = req.body
    let imgarr = []
    if(req.file != undefined){
        imgarr.push(req.file.path)
    }
    let [img] = imgarr
        
    const sql = `INSERT INTO user(
            userid,
            userpw,
            username,
            nickname,
            address,
            gender,
            telephone,
            phonenumber,
            email,
            introduce
        ) values(
            ?,?,?,?,?,?,?,?,?,?
        )`
    
    const sql2 = `INSERT INTO user_img(
        nickname,
        img
    ) values(
        ?,?
    )`
    
    const prepare = [userid,userpw,username,nickname,address,gender,telephone,phonenumber,email,introduce]
    const prepare2 = [nickname,img]
    try{
        const [result] = await pool.execute(sql,prepare)
                         if(img) await pool.execute(sql2,prepare2)
    
        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
    
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
}

exports.idcheck = async (req,res) =>{
    const {userid} = req.body
    console.log(userid)

    try {
        const sql = `SELECT * FROM user WHERE userid = '${userid}'`
        const [result] = await pool.execute(sql)
        
    try {
        if (result.length === 0) throw new Error ('사용불가능한 아이디입니다');
        res.send('1')
    } catch (error) {
        res.send('2')
    }
} catch (error){
    console.log(error)
}
}


exports.profileimg = async (req,res)=>{
    const {nickname} = req.body
    const sql = `SELECT * from user_img WHERE nickname = '${nickname}'`
    
    try{
        const [result] = await pool.execute(sql)
        console.log(result)
        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
    
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
}



exports.login = async (req,res)=>{
    const {userid,userpw} = req.body

    const sql = `SELECT userid,nickname,level FROM user WHERE userid=? and userpw=? and active=1`
    const prepare = [userid,userpw]

    try{
        const [result] = await pool.execute(sql,prepare)

        if(result.length <= 0) throw new Error('회원이 아닙니다')
        const jwt = createToken(result[0])
        console.log(jwt)
        
        res.cookie('token',jwt,{
            path:'/', 
            secure:true,
            domain:'localhost'
        })

        const response = {
            result,
            errno:0,
        }
        res.json(response)

    }catch(e){
        const response = {
            result:[],
            errno:1,
        }
        res.json(response)
    }
}

exports.welcome = async (req,res)=>{
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname

    const sql = `SELECT * from user WHERE nickname='${nickname}'`

    try{
        const [result] = await pool.execute(sql)

        const response = {
            result,
            errno:0,
        }
        res.json(response)

    }catch(e){
        const response = {
            result:[],
            errno:1,
        }
        res.json(response)
    }
}

exports.mypageuser = async (req,res)=>{
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    
    const sql = `SELECT nickname,phonenumber,address,level,point from user WHERE nickname='${nickname}'`
    
    try{
        const [result] = await pool.execute(sql)
                         
        console.log(result)
        const response = {
            result,
            errno:0,
        }
        res.json(response)

    }catch(e){
        const response = {
            result:[],
            errno:1,
        }
        res.json(response)
    }
}

exports.mypageboard = async (req,res)=>{
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    
    const sql = `SELECT cate_name,subject,content,DATE_FORMAT(date,'%Y-%m-%d') as date from board WHERE nickname='${nickname}'`
    try{
        const [result] = await pool.execute(sql)
                         
        console.log(result)
        const response = {
            result,
            errno:0,
        }
        res.json(response)

    }catch(e){
        const response = {
            result:[],
            errno:1,
        }
        res.json(response)
    }
}