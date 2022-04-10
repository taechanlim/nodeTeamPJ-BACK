const pool = require('../../Database/db.js').pool

exports.board = async (req,res)=>{
    const sql = `SELECT idx,subject,nickname,DATE_FORMAT(date,'%Y-%m-%d') as date,hit FROM noticeboard ORDER BY idx DESC`
    const sql2 = `SELECT count(idx) as total_record FROM noticeboard`
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
    const {subject,content} = req.body
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    const sql = `INSERT INTO noticeboard(subject,content,nickname) VALUES (?,?,?)`
    
    const prepare = [subject,content,nickname]
    
    
    let response = {
        result:[],
        errno:0
    }
    try{

        const [result] = await pool.execute(sql,prepare)
                        
                         
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
    const index = parseInt(idx.idx)
    
    const sql = `SELECT * FROM noticeboard WHERE idx=?`
    const sql2 = `UPDATE noticeboard SET hit=hit+1 WHERE idx=${index}`
    
    const prepare = [index]
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql,prepare)
                         await pool.execute(sql2)
                         
                        
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


exports.update = async (req,res)=>{
    const {subject,content,idx} = req.body
    const sql = `UPDATE noticeboard SET subject='${subject}',content='${content}' WHERE idx=${idx}`
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
    const sql = `DELETE from noticeboard WHERE idx=${index}`
    const sql2 = `ALTER TABLE noticeboard AUTO_INCREMENT=1`
    const sql3 = `SET @COUNT = 0`
    const sql4 = `UPDATE noticeboard SET idx = @COUNT:=@COUNT+1`

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

