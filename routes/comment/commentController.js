
const { promisePool } = require('../../Database/db')
const { decodePayload } = require('../../utils/jwt')

//댓글 보기 
const view = async(req,res)=>{
    const sql =`` //여기 수정
    let response = {
        errno:1
}
const conn = await pool.getConnection()

try{
    const [result ] = await conn.execute(sql)
    response = {
        ...response,
        errno:0,
        result : result,
    }
    res.json(response)
}
catch(e){
    console.log(e)
    res.json(response)
}finally{conn.release()}
}


const Writecomment = async (req, res) => {
    const { bid, b_userid, comment } = req.body
    const token = req.cookies.AccessToken
    const userinfo = decodePayload(token)
    let response = {
        errno: 1
    }
    try {
        let sql1 = `
        INSERT INTO comment(bid, c_date, content, c_userid) 
        values(${bid},now(), '${content}', '${userinfo.userid}') ;`
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

const DeleteComment = async (req, res) => {
    const { comment_idx } = req.body
    const token = req.cookies.AccessToken
    const userinfo = decodePayload(token)
    let response = {
        errno: 1
    }
    try {
        let sql1 = `DELETE FROM comment where nickname = ${nickname};`
        const [result] = await promisePool.execute(sql1)
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

const updateComment = async (req, res) => {
    const { comment_idx, comment} = req.body
    const token = req.cookies.AccessToken
    const userinfo = decodePayload(token)

    let response = {
        errno: 1
    }
    try {
        console.log('업데이트실행')
        let sql1 = `UPDATE comment SET comment='${commnet}' where comment_idx=${comment_idx};`
        const [result] = await promisePool.execute(sql1)
        response = {
            ...response,
            errno: 0,
        }
        res.json(response)
    } catch (e) {
        console.log(e)
    }
}



//write,update,delete