
const pool = require('../../Database/db').pool


//댓글 보기 
exports.list = async(req,res)=>{
    
    const {intidx} = req.body
    


    const sql = `SELECT comment_idx,nickname,recommend,nickname,comment,DATE_FORMAT(date,'%Y-%m-%d') as date FROM comment WHERE idx='${intidx}' ORDER BY comment_idx DESC`

    let response = {
        errno: 1
    }
try{
    const [result ] = await pool.execute(sql)
                      
    response = {
        ...response,
        errno: 0,
        result
    }
    res.json(response)
}
    catch(e){
        console.log(e)
    }
}

//댓글작성
exports.write = async (req, res) => {
    const { idx,comment } = req.body
    
    
    const token = req.headers.cookie.split('=')[1]
    
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    let response = {
        errno: 1
    }
    try {
        let sql1 = `
        INSERT INTO comment(idx, nickname, date, comment) 
        values(${idx},'${nickname}',now(), '${comment}') ;`
        const [result] = await pool.execute(sql1)
       
        let pointSql = `UPDATE user SET point=point+10 WHERE nickname='${nickname}'`
        await pool.execute(pointSql)
        response = {
            ...response,
            errno: 0,
            result
        }
        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}
//댓글삭제
exports.delete = async (req, res) => {
  
    const { idx,comment_idx } = req.body  

    const sql = `DELETE from comment WHERE idx=${idx} AND comment_idx=${comment_idx}`
    
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql)
                        

        response = {
            ...response,
            result
        }
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}
// //댓글 수정
exports.update = async (req, res) => {
    const { comment_idx, comment} = req.body
    

    let response = {
        errno: 1
    }
    try {
        console.log('업데이트실행')
        let sql1 = `UPDATE comment SET comment='${comment}' where comment_idx=${comment_idx};`
        const [result] = await pool.execute(sql1)
        response = {
            ...response,
            errno: 0,
        }
        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}



//write,update,delete