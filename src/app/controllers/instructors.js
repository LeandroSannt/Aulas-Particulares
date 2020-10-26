var {age , date} = require("../lib/utils")
var Teacher = require("../models/teacher")

module.exports = {
    index(req , res){
        let {filter,page,limit} =req.query

        page= page || 1
        limit = limit || 5
        let offset = limit *(page-1)

        const params= {
            filter,
            page,
            limit,
            offset,
            callback(teachers){
                const pagination ={
                    total:Math.ceil(teachers[0].total/limit),
                    page
                }
                return res.render("teacher/teachers",{pagination,teachers, filter})
            }
        }
        Teacher.paginate(params)
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
        Teacher.create(req.body, function(teacher){
            return res.redirect(`/teacher/${teacher.id}`)
        })
    },

    show(req , res){
       Teacher.find(req.params.id, function(teacher){
            if(!teacher) return res.send('Professor não encontrado!')
                teacher.created_at = date(teacher.created_at).format
                teacher.age = age(teacher.birth)
                    return res.render("teacher/show", {teacher})
        }) 
    },
    
    edit(req , res){
        Teacher.find(req.params.id, function(teacher){
            if(!teacher){ return res.send('Professor não encontrado!')}
            
                teacher.birth = date(teacher.birth).iso
                    return res.render("teacher/edit", {teacher})
        })
    },

    put(req , res){
        var keys = Object.keys(req.body) 
            for( key of keys){
                if(req.body[key]== ""){
                    return res.send("Por favor, preencha todos os campos!")
            }
        }

        Teacher.update(req.body, function(){
            return res.redirect(`/teacher/${req.body.id}`)
        }) 

    },

    delete(req , res){
        Teacher.delete(req.body.id, function(){
            return res.redirect(`/teacher`)
        })

    },
}