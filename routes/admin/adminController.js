const pool = require('../../Database/db.js').pool
const  {alertMove} = require('../../utils/alert.js')



//회원정보보기

// const adminInfo = async(req,res)=>{
//     try{
//         const {user} = req.session
//         const {id} = req.query
//         let sql = "SELECT * FROM user WHERE userid =?"
//         const [rows,fields] = await promisePool.query(sql,[id])
//         res.render('./admin/amdin_info.html', {
//             rows : rows[0],
//             user
//         })
//     }catch{
//         console.log(err)
//         res.status(500).send('<h1>Internet Server Error</h1>')
//     }
// }
//관리자가 회원정보 수정 

// const postAdminInfo = async (req, res) => {
//     try {
//         const {level, access, userid} = req.body
//         let sql = 'UPDATE user SET level=?, access=? WHERE userid=?'
//         await promisePool.query(sql, [level, access, userid])
//         res.send(alertMove('회원 정보가 수정되었습니다.', '/admin/list'))
//     } catch {
//         console.log(err)
//         res.status(500).send('<h1>Internal Server Error</h1>')
//     }
// }

// const boardHidden = async(req,res)=>{


// } 


//메인카테고리 추가 수정 삭제 각각
exports.adminMainPlus = async(req,res)=>{
    const {cate_name} = req.body
    console.log(cate_name)
    const sql = `INSERT INTO category(cate_name) VALUES (?)`
    const prepare = [cate_name]
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



exports.adminMainEdit = async(req,res)=>{
    const {cate_name} = req.body
    const {idx} = req.body
    console.log(cate_name)
    
    const sql = `UPDATE category SET cate_name='${cate_name}' WHERE cate_idx=${idx}`
    
    let response = {
        result:[],
        errno:0
    }
    try{
        const [result] = await pool.execute(sql)
                        
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
  


exports.adminMainDelete = async(req,res)=>{
    const {idx} = req.body
    
    const sql = `DELETE from category WHERE cate_idx=${idx}`
    
    let response = {
        result:[],
        errno:0
    }
    try{
        const [result] = await pool.execute(sql)
                        
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
  

//서브카테고리 추가 수정 삭제 수정해야됨
// const adminSubPlus = async(req,res)=>{
//     try{
//         res.send(alertMove('카테고리가 추가되었습니다.',`/board/view/?idx= $[idx]`))
//       }catch{
//           console.log(err)
//           res.status(500).send('<h1>Internet Server Error</h1>')
//       }
// }

// const adminSubEdit = async(req,res)=>{
//     try{
//         res.send(alertMove('카테고리가 수정되었습니다.',`/board/view/?idx= $[idx]`))
//       }catch{
//           console.log(err)
//           res.status(500).send('<h1>Internet Server Error</h1>')
//       }
// }

// const adminSubDelete = async(req,res)=>{
//     try{
//         res.send(alertMove('카테고리가 삭제되었습니다.',`/board/view/?idx= $[idx]`))
//       }catch{
//           console.log(err)
//           res.status(500).send('<h1>Internet Server Error</h1>')
//       }
// }

//admin