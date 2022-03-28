const pool = require('../../Database/db.js').pool


exports.list = async (req,res)=>{
    const sql = `SELECT idx,cate_name,thumbnail,subject,nickname,DATE_FORMAT(date,'%Y-%m-%d') as date,hit,likes FROM board ORDER BY idx DESC`
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
    
    
    const sql = `INSERT INTO board(cate_name,subject,content,nickname) VALUES (?,?,?,?),(1,1,1,?)`
    const prepare = [cate_name,subject,content,nickname]
    
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
    // console.log(req)
    const idx = req.query
    const sql = `SELECT * FROM board WHERE idx=?`
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

// exports.getUpdate = async (req,res) => {
    

//     const sql = `select * from board where idx=${index}`

//     let response = {
//         errno:0
//     }

//     try {
//         const [result] = await pool.execute(sql)
//         response = {
//             ...response,
//             result
//         }
//     } catch (error) {
//         console.log(error.message)
//         response = {
//             errno:1
//         }
//     }
//     res.json(response)
// };

exports.postUpdate = async (req,res)=>{
    const board = req.body
    const sql = `UPDATE board SET subject='${board.subject}',content='${board.content}' WHERE idx=${board.idx}`
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