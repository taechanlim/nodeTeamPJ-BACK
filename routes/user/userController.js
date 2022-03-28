const pool = require('../../Database/db.js').pool
const {createToken} = require('../../utils/jwt')

exports.join = async (req,res)=>{
    console.log(req.body)
    const {userid,userpw,profile_img,username,nickname,address,gender,telephone,phonenumber,email,introduce} = req.body
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
    
    }
    


exports.login = async (req,res)=>{
    const {userid,userpw} = req.body

    const sql = `SELECT userid,nickname FROM user WHERE userid=? and userpw=?`
    const prepare = [userid,userpw]

    try{
        const [result] = await pool.execute(sql,prepare)

        if(result.length <= 0) throw new Error('회원이 아닙니다')
        const jwt = createToken(result[0])
        console.log(jwt)
        
        res.cookie('token',jwt,{
            path:'/',
            httpOnly:true,
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