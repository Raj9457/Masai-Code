// create the express app and export it.
const express=require("express")
const {instructorRouter} =require("./routes/instructor.route")
const {studentRouter}=require("./routes/student.route")
const app=express()

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("Check")
})
app.use("/students",studentRouter)
 app.use("/instructors",instructorRouter)

// app.listen(5000,()=>{
//     console.log("Server is running on port 5000")
// })

// export the app
module.exports=app;