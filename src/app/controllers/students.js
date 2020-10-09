const { age, date } = require("../lib/utils")
const Student =require("../models/student")

module.exports ={
index(req,res){
    Student.all(function(students){
        return res.render("students/index",{students})
    })
    

}, 
show(req,res){
    return

}, 
create(req,res){
    return res.render("students/create")
    
},
post(req,res){
    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Dados faltando")
    }

    Student.create(req.body,function(student){
        
        return res.redirect(`/student/${student.id}`)
    })
        
}, 
edit(req,res){
    return

}, 
put(req,res){
     const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Dados faltando")
    }
        return res.redirect(`/student`)
}, 
delete(req,res){
    return

} 
}


