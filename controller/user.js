const conn=require("../bd/index.js")
const moment=require("moment")
const showOneGet=(req,res)=>{
    res.render("user/register.ejs",{}) 
 }

 const showTwoGet=(req,res)=>{
    res.render("user/login.ejs",{}) 
 }

 const ShowOnePost=(req,res)=>{
    const body=req.body
    if(body.username.trim().length<=0||body.password.trim().length<=0||body.nickname.trim().length<=0){
        return res.send({msg:"请填写完整的表单信息",status:501})
    }
    const name=body.username
    const sql="select count(*) as count from blon where username=?"
    conn.query(sql,name,(err,reslut)=>{
        console.log(reslut)
        if(err) return res.send({msg:"用户名不能重复",status:502})
        if(reslut[0].count!==0) return res.send({msg:"请更换其他名称",status:503})

       body.ctime= moment().format("YYYY-MM-DD HH:mm:ss")
       console.log( body.ctime)
        const sql2="insert into blon set ?"
        console.log(body); 
        conn.query(sql2,body,(err,reslut)=>{
            if(err) return res.send({msg:"注册新用户失败",status:504})
            if(reslut.affectedRows !==1) return res.send({msg:"注册新用户失败",status:505})
            res.send({msg:"ok",status:200})
        })
    })
}

const ShowTwoPost=(req, res) => {
    const body = req.body
    const sql3 = "select * from blon where username=? and password=?"
    conn.query(sql3, [body.username, body.password], (err, reslut) => {
        if (err) return res.send({ msg: "用户登录失败", status: 501 })
        if (reslut.length !== 1) return res.send({ msg: "用户登录失败", status: 502 })
        req.session.user=reslut[0]
        req.session.islogin=true
        res.send({ msg: "ok", status: 200 })
    })
}
 module.exports={
    showOneGet,
    showTwoGet,
    ShowOnePost,
    ShowTwoPost
 }