
const { promisePool } = require('../../Database/db')


//댓글 보기 
// exports.view = async(req,res)=>{
//     const sql =`` //여기 수정
//     let response = {
//         errno:1
// }
// const conn = await pool.getConnection()

// try{
//     const [result ] = await conn.execute(sql)
//     response = {
//         ...response,
//         errno:0,
//         result : result,
//     }
//     res.json(response)
// }
// catch(e){
//     console.log(e)
//     res.json(response)
// }finally{conn.release()}
// }

//댓글작성
exports.write = async (req, res) => {
    const { bid,comment } = req.body
  
    console.log(req.headers.cookies)
    const token = req.headers.cookies
    const [,payload,] = token.split('.')
    const decodingPayload = Buffer.from(payload,'base64').toString()
    const nickname = JSON.parse(decodingPayload).nickname
    


    //const userinfo = decodePayload(token)
    
    
    let response = {
        errno: 1
    }
    try {
        let sql1 = `
        INSERT INTO comment(bid, date, comment, c_userid) 
        values(${bid},now(), '${comment}', '${nickname}') ;`
        const [result] = await promisePool.execute(sql1)
       
        let pointSql = `UPDATE user SET point+=10 WHERE nickname='${nickname}'`
        await promisePool.execute(pointSql)
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
// exports.delete = async (req, res) => {
//     const { comment_idx } = req.body
//     const token = req.cookies.AccessToken
//   //  const userinfo = decodePayload(token)
//     let response = {
//         errno: 1
//     }
//     try {
//         let sql1 = `DELETE FROM comment where nickname = ${nickname};`
//         const [result] = await promisePool.execute(sql1)
//         response = {
//             ...response,
//             errno: 0,
//         }
//         res.json(response)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('<h1>Internal Server Error</h1>')
//     }
// }
// //댓글 수정
// exports.update = async (req, res) => {
//     const { comment_idx, comment} = req.body
//     const token = req.cookies.AccessToken
//     const userinfo = decodePayload(token)

//     let response = {
//         errno: 1
//     }
//     try {
//         console.log('업데이트실행')
//         let sql1 = `UPDATE comment SET comment='${comment}' where comment_idx=${comment_idx};`
//         const [result] = await promisePool.execute(sql1)
//         response = {
//             ...response,
//             errno: 0,
//         }
//         res.json(response)
//     } catch (err) {
//         console.log(err)
//         res.status(500).send('<h1>Internal Server Error</h1>')
//     }
// }



//write,update,delete