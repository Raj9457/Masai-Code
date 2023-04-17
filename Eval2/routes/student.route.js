
const {Router}=require("express")
const fs=require("fs")
const {logger}=require("../middleware/logger.middleware")
const { validator } = require("../middleware/validator.middleware")


const studentRouter=Router()
studentRouter.use(logger)

studentRouter.get("/",async(req,res)=>{
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    res.send(alldata.students)
})

// --------POSTING NEW student
studentRouter.post("/addstudent",(req,res)=>{
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let newStudent=req.body;
    alldata.students.push({student_code:alldata.students.length+1,...newStudent})

    fs.writeFile("./db.json",JSON.stringify(alldata),(err,msg)=>{
        if(err){
            return res.send({message:"Something went wrong"})
        }
        else{
            return res.send("Student has been added")
        }
    })
})

//---------SINGLE student-------
studentRouter.get("/:studentCode",(req,res)=>{
    const {studentCode}=req.params;
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let singlestudent=alldata.students.find((ele)=>ele.student_code==studentCode)

if(!singlestudent){
    return res.send({message:"student not found"})
}
else{
    return res.send(singlestudent)
}
})

//------------PATCH
studentRouter.patch("/:studentCode",validator,(req,res)=>{
    const {studentCode}=req.params;
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
   
    alldata.students.map((ele)=>{
        if(ele.student_code==studentCode){
            ele.name=req?.body?.name;
            ele.location=req?.body?.location;
            ele.batch=req?.body?.batch
        }
    })
    fs.writeFile("./db.json",JSON.stringify(alldata),(err,msg)=>{
        if(err){
            return res.send({message:"Something went wrong"})
        }
        else{
            return res.send({
                message:"Successfully updated student with id:"+id,
            })
        }
    })
})
//-------------DELETE-------------
studentRouter.delete("/:studentCode",validator,(req,res)=>{
    const {studentCode}=req.params;
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"));
    const updatedData=alldata.students.filter((ele)=>ele.student_code!=studentCode)
    alldata.students=updatedData

    fs.writeFile("./db.json",JSON.stringify(alldata),(err,msg)=>{
        if(err){
            return res.send({message:"Something went wrong"})
        }
        else{
            return res.send({message:"Deleted Student Details"})
        }
    })
})

module.exports={studentRouter}