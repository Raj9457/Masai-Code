// write the routes for /instructors end poient and add middlewares.
 const {Router}=require("express")
const fs=require("fs")
const {logger}=require("../middleware/logger.middleware")
//   const {validator}=require("../middlewares/validator")

const instructorRouter=Router()
instructorRouter.use(logger)

instructorRouter.get("/",async(req,res)=>{
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    // res.send({instructors:alldata.instructors})
    res.send(alldata.instructors)
})

// --------POSTING NEW instructor
instructorRouter.post("/addinstructor",(req,res)=>{
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let newInstructor=req.body;
    alldata.instructors.push({emp_id:alldata.instructors.length+1,...newInstructor})

    fs.writeFile("./db.json",JSON.stringify(alldata),(err,msg)=>{
        if(err){
            return res.send({message:"Something went wrong"})
        }
        else{
            return res.send({message:"Instructor has been added "})
        }
    })
})

//---------SINGLE instructor-------
instructorRouter.get("/:empID",(req,res)=>{
    const {empID}=req.params;
    const alldata=JSON.parse(fs.readFileSync("./db.json","utf-8"))
    let singleInstructor=alldata.instructors.find((ele)=>ele.emp_id==empID)

if(!singleInstructor){
    return res.send({message:"Instructor not found"})
}
else{
    // return res.send({instructors:singleInstructor})
    return res.send(singleInstructor)
}
})


module.exports={instructorRouter}