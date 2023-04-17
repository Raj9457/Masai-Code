// write the logic for validation middleware.
function validator(req,res,next){
    if(req.method==="PATCH"|| req.method==="DELETE"){
        let {role,pass}=req.query;
        if(!role || !pass){
            return res.send("You are not authorised to do this operation")
        }
        if(role!=="admin"|| role!=="instructor"){
            return res.send("You are not authorised to do this operation")
        }
        if(!pass){
            return res.send("You are not authorised to do this operation")
        }
        if(Number(pass)===7877){
            next()
        }
        else{
            return res.send("You are not authorised to do this operation")
        }
    }
}
module.exports={validator}