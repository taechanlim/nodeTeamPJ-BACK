// const { response } = require('express')
// const res = require('express/lib/response')

const pool = require('../../Database/db').pool


//댓글 보기 
const view = async(req,res)=>{
    const sql =``
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
}finally{     conn.release()}
}

//write,update,delete