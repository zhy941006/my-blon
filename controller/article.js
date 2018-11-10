const moment=require("moment")
const conn=require("../bd/index.js")
const marked=require("marked")

const ShowContenWall=(req,res)=>{
    if(!req.session.islogin) return res.redirect("/")
    res.render("./article/add",{
      user:req.session.user,
      islogin:req.session.islogin
    })
  }



const addArticle=(req,res)=>{
  const body = req.body
  body.authorId=req.session.user.id
  body.ctime=moment().format('YYYY-MM-DD HH-mm-ss')
  const sql="insert into article set ?" 
  conn.query(sql,body,(err,result)=>{
    if(err) return res.send({msg:"发表文章失败",status:500})
    if(result.affectedRows !==1) return res.send({msg:"发表文章失败",status:501})
    res.send({msg:"发表文章成功",status:200,insertId:result.insertId})
  })
}

const ShowCentenHelf=(req,res)=>{
  const id=req.params.id

  const sql="select * from article where id=?"
  conn.query(sql,id,(err,result)=>{
    if(err) return res.send({msg:"发表文章失败",status:500})
    if(result.length !==1) return res.redirect("/")
    marked(result[0].content)
    res.render("./article/info.ejs",{
      user:req.session.user,
      islogin:req.session.islogin,
      article:result[0]
    })
  })
}

const ShowCentenPass=(req,res)=>{
  if(!req.session.islogin) return res.redirect("/")
  const sql="select * from article where id= ?"
  conn.query(sql,req.params.id,(err,result)=>{
    if(err) return res.redirect("/")
    if(result.length !==1) return res.redirect("/")
    res.render("./article/edit.ejs",{
      user:req.session.user,
      islogin:req.session.islogin,
      article:result[0]
    })
  })
}

const EditAticle=(req,res)=>{
  const sql="update article set ? where id=?"
  console.log(req.body);
  conn.query(sql,[req.body,req.body.authorId],(err,result)=>{
    if(err) return res.send({msg:"修改文章失败",status:501})
    if(result.affectedRows !==1) return res.send({msg:"发表文章失败",status:502})
    console.log(result);
    res.send({msg:"ok",status:200})
    
  })
}


module.exports={
    ShowContenWall,
    addArticle,
    ShowCentenHelf,
    ShowCentenPass,
    EditAticle
}