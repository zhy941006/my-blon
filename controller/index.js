
const conn=require("../bd/index.js")

const showIndexPage=(req,res)=>{
    const sql = `select a.id, a.title, a.ctime,u.nickname 
         from article as a 
         LEFT JOIN blon as u 
         on a.authorId = u.id 
         ORDER BY a.id desc;
         select count(*) as count from article`
    conn.query(sql,(err,result)=>{
        pagesize=3
        nowpage=1
        if(err){
           return res.render("index.ejs",{
                user:req.session.user,
                islogin:req.session.islogin,
                articles:result
              })
        }
        const totalPage=Math.ceil(result[1][0].count / pagesize)
        res.render("index.ejs",{
            user:req.session.user,
            islogin:req.session.islogin,
            articles:result[0],
            totalPage:totalPage,
            nowpage:nowpage
        })
    })
   
}

module.exports={
    showIndexPage
}