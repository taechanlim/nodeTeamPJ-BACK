const pool = require('../../Database/db.js').pool


exports.list = async (req,res)=>{
    const {cate_name} = req.body
    
    const sql = `SELECT idx,cate_name,subject,nickname,DATE_FORMAT(date,'%Y-%m-%d') as date,hit,likes FROM board WHERE deleteFlag = 'y' AND cate_name='${cate_name}' ORDER BY idx DESC`
    const sql2 = `SELECT count(idx) as total_record FROM board`
    const sql3 = `SELECT * FROM category`
    const sql4 = `SELECT idx,cate_name,subject,nickname,DATE_FORMAT(date,'%Y-%m-%d') as date,hit,likes FROM board WHERE deleteFlag = 'y' ORDER BY idx DESC`
    let response = {
        errno:1
    }
    // console.log(cate_name)
    try{
        if (cate_name === 'undefined' || cate_name ==='전체'){
        const [result] = await pool.execute(sql4)
            const [result2] = await pool.execute(sql3)
            const [[{total_record}]] = await pool.execute(sql2)
            response = {
                ...response,
                total_record,
                errno:0,
                result,
                result2
            }
        }else{
            const [result] = await pool.execute(sql)
            const [result2] = await pool.execute(sql3)
            const [[{total_record}]] = await pool.execute(sql2)
            response = {
                ...response,
                total_record,
                errno:0,
                result,
                result2
                
            }
        }res.json(response)
        
        
    }catch(e){
        console.log(e.message)
    }

}
exports.list_ranking = async (req,res)=>{
    const sql = `SELECT nickname,point from user order by point desc limit 5`
    let response = {
        errno:1
    }

    try{
        const [result] = await pool.execute(sql)
        
        response = {
            ...response,
            errno:0,
            result,
        }
        
    }catch(e){
        console.log(e.message)
    }

    res.json(response)
}

exports.write = async (req,res)=>{
    const {main_category,subject,content} = req.body
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    

    const sql = `INSERT INTO board(cate_name,subject,content,nickname) VALUES (?,?,?,?)`
    const sql2 = `UPDATE user SET point=point+10 WHERE nickname='${nickname}'`
    
    
    
    const prepare = [main_category,subject,content,nickname]
    
    
    let response = {
        result:[],
        errno:0
    }
    try{

        const [result] = await pool.execute(sql,prepare)
                         await pool.execute(sql2)
                         
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
exports.category = async (req,res) => {
    const sql = `SELECT * FROM category`
    let response = {
        errno:1
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

exports.view_user = async (req,res)=>{
    const {nickname} = req.query
    const realnickname = nickname[1]
    
    const sql = `SELECT * FROM user WHERE nickname='${realnickname}'`
    

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

exports.likes = async (req,res)=>{
    const {idx} = req.body //board idx값
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    const sql = `INSERT INTO likes(idx,nickname) VALUES(${idx},'${nickname}')`
    const sql2 = `UPDATE likes SET like_num=like_num+1 WHERE idx=${idx}`
    const sql3 = `UPDATE user SET like_check=${idx} WHERE nickname='${nickname}'`
    const sql4 = `UPDATE board SET likes=likes+1 WHERE idx=${idx}`
    const sql5 = `select like_check from user where nickname='${nickname}'`
    
      
    let response = {
        errno:0
    }
    try{
        
        const [result] = await pool.execute(sql5)
        // console.log(result[0].like_check)
        
        if(result[0].like_check != idx){
            const [result2] = await pool.execute(sql)
                              await pool.execute(sql2)
                              await pool.execute(sql3)
                              await pool.execute(sql4)

            response = {
                ...response,
                result2
            }

            res.json(response)
            
        }else{
            response = {
                errno:1
            }
            res.json(response)
        }

    }catch(e){
            {
                console.log(e.message)
                response={
                    errno:1
                }
            }
    }
}

exports.likescancle = async (req,res)=>{
    const {idx} = req.body //board idx값
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    const sql = `INSERT INTO likes(idx,nickname) VALUES(${idx},'${nickname}')`
    const sql2 = `UPDATE likes SET like_num=like_num-1 WHERE idx=${idx}`
    const sql3 = `UPDATE user SET like_check=0 WHERE nickname='${nickname}'`
    const sql4 = `UPDATE board SET likes=likes-1 WHERE idx=${idx}`
    const sql5 = `select like_check from user where nickname='${nickname}'`
    
      
    let response = {
        errno:0
    }
    try{
        
        const [result] = await pool.execute(sql5)
        
        
        if(result[0].like_check == idx){
            const [result2] = await pool.execute(sql)
                              await pool.execute(sql2)
                              await pool.execute(sql3)
                              await pool.execute(sql4)

            response = {
                ...response,
                result2
            }

            res.json(response)
            
        }else{
            response = {
                errno:1
            }
            res.json(response)
        }

    }catch(e){
            {
                console.log(e.message)
                response={
                    errno:1
                }
            }
    }
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

// 메인화면 헤더-보드 팝업시
exports.pop = async (req,res) => {
    const sql = `SELECT idx,cate_name,subject,content,nickname,DATE_FORMAT(date,'%Y-%m-%dT%T') as date,hit,likes FROM board ORDER BY idx DESC`
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

// 메인화면 헤더-SearchInput 입력시
exports.search = async (req,res) => {
    
    const word = req.body.input

    const sql = `SELECT idx,cate_name,subject,content,nickname,DATE_FORMAT(date,'%Y-%m-%dT%h:%i:%s') as date,hit,likes FROM board WHERE subject LIKE '%${word}%'`
    const sql2 = `SELECT idx,cate_name,subject,content,nickname,DATE_FORMAT(date,'%Y-%m-%dT%h:%i:%s') as date,hit,likes FROM board WHERE content LIKE '%${word}%'`
    // const prepare = [word]

    let response = {
        errno:0
    }

    try{
        const [result] = await pool.execute(sql)
        if (result.length === 0) {
            const [result] = await pool.execute(sql2)
            response = {
                ...response,
                result
            }
            console.log('sql2')
            res.json(response)
        } else {
            response = {
                ...response,
                result
            }
            console.log('sql')
            res.json(response)
        }

        console.log(response)

    }catch(e){
        {
            console.log(e.message)
            response={
                errno:1
            }
        }
    }
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

