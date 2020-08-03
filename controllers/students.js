const fs = require('fs')
const data = require("../data.json")
const {date } = require("../utils")
const Intl = require("intl")

exports.table =function (req,res){
   
    return res.render("students/index",{students:data.students})

}

exports.show = function (req, res) {
    const { id } = req.params
    const foundStudent = data.students.find(function (students) {
        return id == students.id
    })
    if (!foundStudent) return res.send("students not found")

    const students = {
        ...foundStudent,
        birth: date(foundStudent.birth).birthDay

    }
    return res.render(`students/show`, { students })
}

exports.create =function (req, res) {
    return res.render("students/create")
}

exports.post = function (req, res) {

    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Dados faltando")
    }

    birth = Date.parse(req.body.birth)
    let id = 1
    const lastStudant =data.students [data.students.length -1]
    if  (lastStudant){
        id =lastStudant.id+1
    }

    data.students.push({
        id,
        ...req.body,
         birth
    })

    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("algum erro")

        return res.redirect(`/students/${id}`)
    })
}

exports.edit = function (req, res) {
    const { id } = req.params
    
    const foundStudent = data.students.find(function (students) {
        return id == students.id
    })
    if (!foundStudent) return res.send("students not found")

    const students = {
        ...foundStudent,
        birth: date(foundStudent.birth).iso
    }

    return res.render("students/edit", { students })
}

exports.put=function(req,res){
    const{id}= req.body
    let index = 0

    const foundStudent = data.students.find(function (students, foundIndex) {
        if (students.id == id){
        index = foundIndex
        return true
    }
    })
    if (!foundStudent) return res.send("students not found")

    const students ={
        ...foundStudent,
        ...req.body,
        birth: Date.parse(req.body.birth),
        id:Number(req.body.id)
    }

    data.students[index] = students

    fs.writeFile("data.json", JSON.stringify(data,null,2),function(err){
        if(err) return res.send("Write error")
    })
    return res.redirect(`/students/${id}`)  
}

exports.delete = function(req,res){
    const {id} = req.body
    
    const filteredstudentss = data.students.filter(function(students){
        return id != students.id
    })
    data.students= filteredstudentss

    fs.writeFile("data.json", JSON.stringify(data,null,2), function(err){
        if (err) return res.send("Erro")

        return res.redirect ("/students")
    })
}








