
const pool = require('../../Database/db').pool


//댓글 보기 
exports.list = async(req,res)=>{
    
    const {intIdx} = req.body
    


    const sql = `SELECT comment_idx,nickname,recommend,nickname,comment,DATE_FORMAT(date,'%Y-%m-%d') as date FROM comment WHERE idx='${intIdx}' ORDER BY comment_idx DESC`

  

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
    const { comment_idx } = req.body
    
    const sql = `DELETE from comment WHERE comment_idx=${comment_idx}`
    const sql2 = `ALTER TABLE comment AUTO_INCREMENT=1`
    const sql3 = `SET @COUNT = 0`
    // const sql4 = `UPDATE comment SET idx = @COUNT:=@COUNT+1`
    
    
    let response = {
        errno:0
    }
    try{
        const [result] = await pool.execute(sql)
                         await pool.execute(sql2)
                         await pool.execute(sql3)
                         // await pool.execute(sql4)

        response = {
            ...response,
            result
        }
        res.json(response)
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

exports.recommend = async (req,res)=>{
    const {comment_idx} = req.body //board idx값
    const {token} = req.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    
    const sql1 = `UPDATE comment SET recommend=recommend+1 WHERE comment_idx=${comment_idx}`
    const sql2 = `UPDATE user SET recommend=${comment_idx} WHERE nickname='${nickname}'`
    // const sql4 = `UPDATE board SET likes=likes+1 WHERE idx=${comment_idx}`
    const sql3 = `select recommend from user where nickname='${nickname}'`
    
      
    let response = {
        errno:0
    }
    try{
        
        const [result] = await pool.execute(sql3)
        console.log(result[0].recommend)
        
        if(result[0].recommend != comment_idx){
            
            const [result2] = await pool.execute(sql1)
                              await pool.execute(sql2)

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



//write,update,delete