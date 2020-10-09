var {age , date} = require("../lib/utils")
var teacher = require("../models/teacher")

module.exports = {
    index(req , res){
        teacher.all(function(teachers){
            return res.render("teacher/teachers" , {teachers})
        })
 
    },
    
    create(req , res){
        return res.render('teacher/create')
    },

    post(req , res){

        var keys = Object.keys(req.body) 
        for( key of keys){
            if(req.body[key]== ""){
                return res.send("Por favor, preencha todos os campos!")
            }
        }
        teacher.create(req.body, function(teacher){
            return res.redirect(`/teacher/${teacher.id}`)
        })
    },

    show(req , res){
       teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Professor não encontrado!')

                teacher.age = age(teacher.birth)
                teacher.service = teacher.services.split(",")
                teacher.created_at = date(teacher.created_at).format
            
                    return res.render("teacher/show", {teacher})
        })
   
    },
    
    edit(req , res){
       /* teacher.find(req.params.id, function(teacher){
            if(!teacher){ return res.send('Professor não encontrado!')}
            
                teacher.birth = date(teacher.birth).iso
                    return res.render("teacher/edit", {teacher})
        })*/
        return
    },

    put(req , res){
        /*var keys = Object.keys(req.body) 
            for( key of keys){
                if(req.body[key]== ""){
                    return res.send("Por favor, preencha todos os campos!")
            }
        }

        teacher.update(req.body, function(){
            return res.redirect(`/teacher/${req.body.id}`)
        })*/    
        return

    },

    delete(req , res){
       /* teacher.delete(req.body.id, function(){
            return res.redirect(`/teacher`)
        })*/

    },
}