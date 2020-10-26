var {age , date} = require("../lib/utils")
var Student = require("../models/student")

module.exports = {
    index(req , res){

        let {filter,page,limit} =req.query

        page = page || 1
        limit = limit || 5
        let offset = limit *(page -1)

        const params={
            filter,
            page,
            limit,
            offset,
            callback(students){
                const pagination ={
                    total:Math.ceil(students[0].total/limit),                    
                    page
                }
                return res.render("students/index",{pagination,students, filter})
            } 
        }
        Student.paginate(params)
    },
    
    create(req , res){
        Student.teacherSelectOptions(function(options){
            return res.render('students/create', { teacherOptions:options})
        })      
    },

    post(req , res){

        var keys = Object.keys(req.body) 
        for( key of keys){
            if(req.body[key]== ""){
                return res.send("Por favor, preencha todos os campos!")
            }
        }
        Student.create(req.body, function(student){
            return res.redirect(`/students/${student.id}`)
        })
    },

    show(req , res){
       Student.find(req.params.id, function(students){
            if(!students) return res.send('Professor não encontrado!')
                students.birth = age(students.birth)
                    return res.render("students/show", {students})
        })
    },
    
    edit(req , res){
        Student.find(req.params.id, function(students){
            if(!students){ return res.send('Professor não encontrado!')}
                students.birth = date(students.birth).iso

                Student.teacherSelectOptions(function(options){
                    return res.render("students/edit", {students, teacherOptions:options})
            })
        })
    },

    put(req , res){
        var keys = Object.keys(req.body) 
            for( key of keys){
                if(req.body[key]== ""){
                    return res.send("Por favor, preencha todos os campos!")
            }
        }
        Student.update(req.body, function(){
            return res.redirect(`/students/${req.body.id}`)
        })
    },

    delete(req , res){
        Student.delete(req.body.id, function(){
            return res.redirect(`/students`)
        })    
    },
}