// write the logic for logger middleware and export it.
const fs=require("fs")

function logger(req,res,next){
let method=req.method;
let userAgent=req.headers["user-agent"]
let route=req.originalUrl
console.log(route)
let data=`Method:${method}`
// let data=`Method:${method},`
fs.writeFileSync("./logs.txt",data)
next()
}
module.exports={logger}
