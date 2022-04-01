const pool = require('../../Database/db.js').pool
const {createToken} = require('../../utils/jwt')
const {alertMove} = require('../../utils/alert.js')

exports.join = async (req,res)=>{
    const {userid,userpw,username,nickname,address,gender,telephone,phonenumber,email,introduce} = req.body
    let imgarr = []
    if(req.file != undefined){
        imgarr.push(req.file.path)
    }
    let [img] = imgarr
        
    const sql = `INSERT INTO user(
            userid,
            userpw,
            username,
            nickname,
            address,
            gender,
            telephone,
            phonenumber,
            email,
            introduce
        ) values(
            ?,?,?,?,?,?,?,?,?,?
        )`
    
    const sql2 = `INSERT INTO user_img(
        nickname,
        img
    ) values(
        ?,?
    )`
    
    const prepare = [userid,userpw,username,nickname,address,gender,telephone,phonenumber,email,introduce]
    const prepare2 = [nickname,img]
    try{
        const [result] = await pool.execute(sql,prepare)
                         if(img) await pool.execute(sql2,prepare2)
    
        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
    
        res.json(response)
        
    
        }catch(e){
        console.log(e.message)
        const response = {
            result:{
                row:0,
                id:0
            },
            errno:1,
        }
        res.json(response)
        }
}

exports.idcheck = async (req,res) =>{
    const {userid} = req.body
    console.log(userid)

    try {
        const sql = `SELECT * FROM user WHERE userid = '${userid}'`
        const [result] = await pool.execute(sql)
        console.log(result)
        console.log(result.length)
    try {
        if (result.length === 0) throw new Error ('사용불가능한 아이디입니다');
        res.send('1')
    } catch (error) {
        res.send('2')
    }
} catch (error){
    console.log(error)
}
}


exports.profileimg = async (req,res)=>{
    const {nickname} = req.body
    const sql = `SELECT * from user_img WHERE nickname = '${nickname}'`
    
    try{
        const [result] = await pool.execute(sql)
        console.log(result)
        const response = {
            result:{
                row:result.affectedRows,
                id:result.insertId
            },
            errno:0,
        }
    
        res.json(response)
    
    
        }catch(e){
        console.log(e.message)
        const response = {
            result:{
                row:0,
                id:0
            },
            errno:1,
        }
        res.json(response)
        }
}



exports.login = async (req,res)=>{
    const {userid,userpw} = req.body

    const sql = `SELECT userid,nickname FROM user WHERE userid=? and userpw=?`
    const prepare = [userid,userpw]

    try{
        const [result] = await pool.execute(sql,prepare)

        if(result.length <= 0) throw new Error('회원이 아닙니다')
        const jwt = createToken(result[0])
        console.log(jwt)
        
        res.cookie('token',jwt,{
            path:'/', 
            secure:true,
            domain:'localhost'
        })

        const response = {
            result,
            errno:0,
        }
        res.json(response)

    }catch(e){
        const response = {
            result:[],
            errno:1,
        }
        res.json(response)
    }
}

//쓴 게시글 보기 수정해야댐
const getBoard = async (req, res) => {
    try {
        const {user} = req.session
        const page = req.params.num
        const count = 10
         //sql문 수정해야됨
        let sql = 'SELECT idx, title, DATE_FORMAT(date, "%Y-%m-%d") AS date, view, likes FROM user LEFT JOIN board ON user.userid=board.userid WHERE board.userid=?'
        const [rows, fields] = await promisePool.query(sql, [user.userid])
        pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./user/profile/user_board.html', {
            result,
            page,
            pageNum,
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

//쓴 댓글 보기
const getComment = async (req, res) => {
    try {
        const {user} = req.session
        const page = req.params.num
        const count = 10
         //sql문 수정해야됨
        let sql = 'SELECT cid, comment, DATE_FORMAT(c_date, "%Y-%m-%d %r") AS date, bid FROM user LEFT JOIN comment ON user.userid=comment.c_userid WHERE c_userid=?'
        const [rows, fields] = await promisePool.query(sql, [user.userid])
        pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./user/profile/user_comment.html', {
            result,
            page,
            pageNum,
            user
        })
    } catch {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}
//스크랩 보기
const getScrap = async (req, res) => {
    try {
        const {user} = req.session
        const page = req.params.num
        const count = 10
        //sql문 수정해야됨
        let sql = 'SELECT s_idx, s_userid, idx, title, nickname, DATE_FORMAT(date, "%Y-%m-%d") AS date FROM scrap LEFT JOIN board ON scrap.bid=board.idx WHERE s_userid=?;'
        const [rows, fields] = await promisePool.query(sql, [user.userid])
        pageNum = []
        for (let i=0; i<rows.length/count; i++) {pageNum.push(i)}
        const result = paging(page, count, rows)
        res.render('./user/profile/user_scrap.html', { //렌더 위치 확인하고 주석지우기
            user,
            result,
            page,
            pageNum
        })
    } catch (err) {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }    
}


//구현해야 할 부분 스크랩보기  + 좋아요 
// //스크랩보기 
// exports.postScrap = async(req,res)=>{
//     try{
//         const {user} = req.session
//     }
// }