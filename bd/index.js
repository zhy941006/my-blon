const mysql = require("mysql")
const conn = mysql.createConnection({
    host: "127.0.0.1",
    database: "my-blon",
    user: "root",
    password: "root",
    // 开启使用多条sql语句的执行
    multipleStatements:true
})

module.exports =conn