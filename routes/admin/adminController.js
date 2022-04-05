const pool = require('../../Database/db.js').pool
const  {alertMove} = require('../../utils/alert.js')

const adminCheck = (req,res)=>{
    const {user} = req.session
    if(user.level != 3){
        res.send(alertMove('최고 관리자로 접속하여 이용해주십시오.', '/'))
    }
    else{
        res.render('./admin/admin_home.html',{// 여기 렌더할 경로
            user
        })
    }
}

const login = async(req,res)=>{
    try{
        const {userid,userpw} = req.body
        let sql = "SELECT * FROM user WHERE userid=? AND userpw=? AND level=?"
        let sqlArr = [userid,userpw,3]//3이어야 관리자 로그인성공
        const [rows,fields] =await promisePool.query(sql,sqlArr)
        if(rows[0] != undefined){
            req.session.user = rows[0]
            const {user} = req.session
            res.render('./admin/admin_home',{
                user
            })
            alert('관리자님 환영합니다.')
        }else{
            res.send(alertMove('최고관리자만 접속 가능합니다','/'))
        }
    }catch{
        console.log(err)
        res.status(500).send('<h1>Internot Server Error</h1>')
    }
}

const logout = (req,res)=>{
    req.session.destroy(()=>{
        req.session
    })
res.send(alertMove('최고관리자 로그아웃 되었습니다.','/'))
}

//회원정보보기

const adminInfo = async(req,res)=>{
    try{
        const {user} = req.session
        const {id} = req.query
        let sql = "SELECT * FROM user WHERE userid =?"
        const [rows,fields] = await promisePool.query(sql,[id])
        res.render('./admin/amdin_info.html', {
            rows : rows[0],
            user
        })
    }catch{
        console.log(err)
        res.status(500).send('<h1>Internet Server Error</h1>')
    }
}
//관리자가 회원정보 수정 

const postAdminInfo = async (req, res) => {
    try {
        const {level, access, userid} = req.body
        let sql = 'UPDATE user SET level=?, access=? WHERE userid=?'
        await promisePool.query(sql, [level, access, userid])
        res.send(alertMove('회원 정보가 수정되었습니다.', '/admin/list'))
    } catch {
        console.log(err)
        res.status(500).send('<h1>Internal Server Error</h1>')
    }
}

// const boardHidden = async(req,res)=>{


// } 


//메인카테고리 추가 수정 삭제 각각
const adminMainPlus =async(req,res)=>{
    try{
    const {cate_name} = req.body
    let sql = `INSERT INTO category(cate_name) `
    res.send(alertMove('카테고리가 추가되었습니다.', `/board/view/?idx=${idx}`)) //뒷부분 수정
    }catch   {

      console.log(err)
    res.status(500).send('<h1>Internet Server Error</h1>')
}
}



const adminMainEdit=async(req,res)=>{
  try{
      const {cate_name} = req.body
      let sql = 'UPDATE category SET title=?, content=? WHERE idx=?'
      await promisePool.query(sql, [title, content, idx])
      res.send(alertMove('카테고리가 수정되었습니다.', `/board/view/?idx=${idx}`)) //뒷부분 수정
  }catch{
      console.log(err)
      res.status(500).send('<h1>Internet Server Error</h1>')

  }
}


const adminMainDelete =async(req,res)=>{
  try{
      const{cate_name} = req.body

      let sql = `DELETE category SET title =? , content =? WHERE`
        await promisePool.query(sql,[title,content,idx])
        res.send(alertMove('카테고리가 삭제되었습니다.',`/board/view/?idx= $[idx]`))
    }catch{
        console.log(err)
        res.status(500).send('<h1>Internet Server Error</h1>')
    }
}

//서브카테고리 추가 수정 삭제 수정해야됨
const adminSubPlus = async(req,res)=>{
    try{
        res.send(alertMove('카테고리가 추가되었습니다.',`/board/view/?idx= $[idx]`))
      }catch{
          console.log(err)
          res.status(500).send('<h1>Internet Server Error</h1>')
      }
}

const adminSubEdit = async(req,res)=>{
    try{
        res.send(alertMove('카테고리가 수정되었습니다.',`/board/view/?idx= $[idx]`))
      }catch{
          console.log(err)
          res.status(500).send('<h1>Internet Server Error</h1>')
      }
}

const adminSubDelete = async(req,res)=>{
    try{
        res.send(alertMove('카테고리가 삭제되었습니다.',`/board/view/?idx= $[idx]`))
      }catch{
          console.log(err)
          res.status(500).send('<h1>Internet Server Error</h1>')
      }
}

module.exports = {
   
    login,
    adminCheck,
    logout,
    adminInfo,
    boardHidden,
    postAdminInfo,
    adminMainPlus,
    adminMainEdit,
    adminMainDelete,
    adminSubPlus,
    adminSubEdit,
    adminSubDelete
}

//admin