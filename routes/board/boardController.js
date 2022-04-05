const pool = require('../../Database/db.js').pool


exports.list = async (req,res)=>{
    const sql = `SELECT idx,cate_name,subject,nickname,DATE_FORMAT(date,'%Y-%m-%d') as date,hit,likes FROM board WHERE deleteFlag = 'y' ORDER BY idx DESC`
    const sql2 = `SELECT count(idx) as total_record FROM board`
    let response = {
        errno:1
    }

    try{
        const [result] = await pool.execute(sql)
        const [[{total_record}]] = await pool.execute(sql2)
        response = {
            ...response,
            total_record,
            errno:0,
            result
        }
        
    }catch(e){
        console.log(e.message)
    }

    res.json(response)
}

exports.write = async (req,res)=>{
    const {cate_name,subject,content} = req.body
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname

    const sql = `INSERT INTO board(cate_name,subject,content,nickname) VALUES (?,?,?,?)`
    const sql2 = `UPDATE user SET point=point+10 WHERE nickname='${nickname}'`
    
    const prepare = [cate_name,subject,content,nickname]

    // const files = req.files
    
    // const filename = new Array()
    // if ( req.files.upload1 != undefined ) {filename.push(req.files.upload1[0].filename)}
    // if ( req.files.upload2 != undefined ) {filename.push(req.files.upload2[0].filename)}
    // if ( req.files.upload3 != undefined ) {filename.push(req.files.upload3[0].filename)}
    // if ( req.files.upload4 != undefined ) {filename.push(req.files.upload4[0].filename)}

    
    let response = {
        result:[],
        errno:0
    }
    try{

        const [result] = await pool.execute(sql,prepare)
                         await pool.execute(sql2)
    
        
        // const [result2] = await pool.execute(sql3,prepare)
        // const b_idx = result2.insertId

        // // 이미지 파일이 있으면 추가
        // if ( files != [] )
        // files.forEach( async v => {
        //     const sql3 = `INSERT INTO board_img(img,idx) VALUES ('${v}',${b_idx})`
        //     await pool.execute(sql2)
        // });

        response = {
            ...response,
            result:{
                affectedRows:result.affectedRows,
                insertId:result.insertId
            }
        }
    }catch(e){
        console.log(e.message)
        response={
            errno:1
        }
    }

    res.json(response)
}

exports.view = async (req,res)=>{
    
    const idx = req.query
    const {nickname} = req.query
    const index = parseInt(idx.idx)
    const realnickname = nickname[1]
    const sql = `SELECT * FROM board WHERE idx=?`
    const sql2 = `UPDATE board SET hit=hit+1 WHERE idx=${index}`
    const sql3 = `SELECT * FROM user WHERE nickname='${realnickname}'`
    
    
    const prepare = [index]
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql,prepare)
                         await pool.execute(sql2)
                         await pool.execute(sql3)
                        
        response = {
            ...response,
            result
        }
        
    }catch(e){
            {
                console.log(e.message)
                response={
                    errno:1
                }
            }
    }
    res.json(response)
}

exports.likes = async (req,res,next)=>{
    
    const {idx} = req.body //board idx값
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname


    const sql = `UPDATE likes SET like_num=like_num+1 WHERE idx=${idx}`
    const sql2 = `UPDATE user SET like_check=1 WHERE nickname='${nickname}'`
    const sql3 = `select like_check from user where nickname='${nickname}'`
    
    
    
    let response = {
        errno:0
    }
    try{
        
        const [result] = await pool.execute(sql3)
        
        if(result[0].like_check != 1){
            next()
        }else{
            res.send('좋아요는 1번만 누를수있습니다')
        }

        const [result2] = await pool.execute(sql)
                          await pool.execute(sql2)
        
                         
        response = {
            ...response,
            result2
        }
    }catch(e){
            {
                console.log(e.message)
                response={
                    errno:1
                }
            }
    }
    res.json(response)
}

exports.update = async (req,res)=>{
    const {subject,content,idx} = req.body
    const sql = `UPDATE board SET subject='${subject}',content='${content}' WHERE idx=${idx}`
    const prepare = [idx]
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql,prepare)
        response = {
            ...response,
            result
        }
    }catch(e){
            {
                console.log(e.message)
                response={
                    errno:1
                }
            }
    }
    res.json(response)
}

exports.delete = async (req,res)=>{
    const index = req.body.idx
    const sql = `DELETE from board WHERE idx=${index}`
    const sql2 = `ALTER TABLE board AUTO_INCREMENT=1`
    const sql3 = `SET @COUNT = 0`
    const sql4 = `UPDATE board SET idx = @COUNT:=@COUNT+1`
    
    
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql)
                         await pool.execute(sql2)
                         await pool.execute(sql3)
                         await pool.execute(sql4)

        response = {
            ...response,
            result
        }
    }catch(e){
            {
                console.log(e.message)
                response={
                    errno:1
                }
            }
    }
    res.json(response)
}

exports.pop = async (req,res) => {
    const sql = `SELECT idx,cate_name,subject,content,nickname,DATE_FORMAT(date,'%Y-%m-%d') as date,hit,likes FROM board ORDER BY idx DESC`
    const prepare = []

    let response = {
        errno:0
    }

    try{
        const [result] = await pool.execute(sql)
        response = {
            ...response,
            result
        }
    }catch(e){
        {
            console.log(e.message)
            response={
                errno:1
            }
        }
    }
    res.json(response)
}

exports.search = async (req,res) => {
    console.log(req.body.input)
    const word = req.body.input

    const sql = `SELECT idx,subject,content,nickname FROM board WHERE content LIKE '${word}%';`
    // const prepare = [word]

    let response = {
        errno:0
    }

    try{
        const [result] = await pool.execute(sql)
        // console.log(result)
        response = {
            ...response,
            result
        }
    }catch(e){
        {
            console.log(e.message)
            response={
                errno:1
            }
        }
    }
    res.json(response)
}


//sql2  작성해야함 , db 에 scrap 손봐야함
exports.scrap = async(req,res) => {
const {idx} = req.body
const userid = `admin`
const sql1 = `SELECT * FROM scrap where bid = ${idx} and s_userid='${userid}'`
let response = {
    errno : 1
} 
try{
    const [result] = await promisePool.execute(sql1)
    if(result[0] !== undefined){
        response = {
            ...response,
            errMsg : 'Already scrap'
        }
    }
    else{
        const sql2 = ``
        const [result2] = await promisePool.execute(sql2)
        response = {
            ...response,
            errno:0
        }
    }
    res.json(response)
    }catch(e){
        console.log(e)
        res.json(response)
    }
}

