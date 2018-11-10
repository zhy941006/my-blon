const express=require("express")
const app=express()
const fs=require("fs")
const path=require("path")
const bodyParser=require("body-parser")

// 倒入session中间件
const session=require("express-session")
app.use(
    session({
        secret:"这是密钥",
        resave:false,
        saveUninitialized:false
    })
)

app.set("view engine","ejs")
app.set("views","./view")

app.use(bodyParser.urlencoded({extended:false}))
 
app.use("/node_modules",express.static("./node_modules"))

// const router1=require("./router/index.js")
// app.use(router1)

// //用户请求登录
// const router2=require("./router/user.js")
// app.use(router2)

// 使用循环方式自动注册路由
fs.readdir(path.join(__dirname,"./router"),(err,filenames)=>{
    if(err) return console.log("读取router 目录中的路由失败")
    // console.log(filenames)
    filenames.forEach(fname => {
        const router=require(path.join(__dirname,"./router",fname))
        app.use(router)
        
    });
})

app.listen(80,()=>{
    console.log("http://127.0.0.1")
})