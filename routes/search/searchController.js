const {promisePool} = require('../../Database/db')

const postSearchData =async(req,res)=>{
    try{
        const data =`%${req.body.dat}%`
        console.log(data)
        const sql = `SELECT * FROM board b
                     LEFT JOIN user u ON
                     b.b_userid = u.userid
                     WHERE nickname LIKE ? OR subject LIKE ? OR content LIKE?
                     ORDER BT idx DESC
                    `
        const prepare = [data, data, data]
        const [rows,] =await promisePool.query(sql,prepare)
        res.json(rows)
    }catch(err){
        console.log(err)
        res.status(500).send('Internal Server ERROR')
    }
}

module.exports = {
    postSearchData
}