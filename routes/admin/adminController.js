const pool = require('../../Database/db.js').pool
const  {alertMove} = require('../../utils/alert.js')



//회원정보보기

exports.userinfo = async(req,res)=>{
    const sql = `SELECT * FROM user`
    
    let response = {
        result:[],
        errno:1
    }
    try{
        const [result] = await pool.execute(sql) 
        response = {
            ...response,
            errno:0,
            result
        }
    }catch(e){
        console.log(e.message)
        response={
            errno:1
        }
    }

    res.json(response)
    console.log(response)
}
//관리자가 회원정보 수정 
// 레벨과 활동상태 변경가능
exports.userinfo_Edit = async(req,res)=>{
    const {nickname,level,active} = req.body
    const sql = `UPDATE user SET level=${level} WHERE nickname='${nickname}'`
    const sql2 = `UPDATE user SET active=${active} WHERE nickname='${nickname}'`
    
    let response = {
        result:[],
        errno:1
    }
    try{
        const [result] = await pool.execute(sql) 
                         await pool.execute(sql2) 
        response = {
            ...response,
            errno:0,
            result
        }
    }catch(e){
        console.log(e.message)
        response={
            errno:1
        }
    }

    res.json(response)
    console.log(response)
}
// 회원탈퇴시키기
exports.userinfo_Delete = async(req,res)=>{
    const {nickname} = req.body
    const sql = `DELETE FROM user WHERE nickname='${nickname}'`
    
    let response = {
        result:[],
        errno:1
    }
    try{
        const [result] = await pool.execute(sql) 
                         
        response = {
            ...response,
            errno:0,
            result
        }
    }catch(e){
        console.log(e.message)
        response={
            errno:1
        }
    }

    res.json(response)
    
}

//게시판 리스트 , 게시글 숨기기

exports.boardlist = async (req,res)=>{
    const sql = `SELECT * FROM board ORDER BY idx DESC`
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

exports.boardEdit = async (req,res)=>{
    // yn 은 deleteFlag 값
    const {idx,yn} = req.body
    const sql = `UPDATE board SET deleteFlag='${yn}' WHERE idx=${idx}`
    
    let response = {
        errno:1
    }

    try{
        const [result] = await pool.execute(sql)
        
        response = {
            ...response,
            errno:0,
            result
        }
        
    }catch(e){
        console.log(e.message)
    }

    res.json(response)
}

//메인카테고리 추가 수정 삭제 각각
exports.MainList = async(req,res)=>{
    const sql = `SELECT * from category`
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
        console.log(e.message)
        response={
            errno:1
        }
    }

    res.json(response)
}


exports.MainPlus = async(req,res)=>{
    const {cate_name} = req.body
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


exports.MainEdit = async(req,res)=>{
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
  


exports.MainDelete = async(req,res)=>{
    const {cate_name} = req.body
    // console.log(cate_name)
    const sql = `DELETE from category WHERE cate_name='${cate_name}'`
    
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
exports.SubPlus = async(req,res)=>{
    const {cate_idx,subcate_name} = req.body
    
    const sql = `INSERT INTO subcategory(cate_idx,subcate_name) VALUES (?,?)`
    const prepare = [cate_idx,subcate_name]
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

exports.SubEdit = async(req,res)=>{
    const {subcate_name} = req.body
    const {subcate_idx} = req.body
    console.log(subcate_idx)
    
    
    const sql = `UPDATE subcategory SET subcate_name='${subcate_name}' WHERE subcate_idx=${subcate_idx}`
    
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

exports.SubDelete = async(req,res)=>{
    const {subcate_idx} = req.body
    
    const sql = `DELETE from subcategory WHERE subcate_idx=${subcate_idx}`
    
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