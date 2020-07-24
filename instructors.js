const fs = require('fs')
const data = require("./data.json")
const { age, date } = require("./utils")
const Intl = require("intl")


exports.post = function (req, res) {

    const keys = Object.keys(req.body)
    for (key of keys) {
        if (req.body[key] == "")
            return res.send("Dados faltando")
    }

    let { avatar_url, birth, name, escolaridade, availability, services } = req.body

    birth = Date.parse(birth)
    const create_at = Date.now()
    const id = Number(data.instructors.length+1)

    data.instructors.push({
        id,
        name,
        create_at,
        birth,
        services,
        availability,
        escolaridade,
        avatar_url
    })


    fs.writeFile("data.json", JSON.stringify(data, null, 2), function (err) {
        if (err) return res.send("algum erro")

        return res.redirect(`/teacher/${id}`)
    })
}

exports.show = function (req, res) {
    const { id } = req.params
    const foundTeacher = data.instructors.find(function (teacher) {
        return teacher.id == id
    })

    if (!foundTeacher) return res.send("Teacher not found")

    const teacher = {
        ...foundTeacher,
        age: age(foundTeacher.birth),
        services: foundTeacher.services.split(","),
        create_at: new Intl.DateTimeFormat('pt-BR').format(foundTeacher.create_at)
    }


    return res.render(`teacher/show`, { teacher })
}

exports.edit = function (req, res) {
    const { id } = req.params
    const foundTeacher = data.instructors.find(function (teacher) {
        return teacher.id == id
    })
    if (!foundTeacher) return res.send("Teacher not found")

    const teacher = {
        ...foundTeacher,
        birth: date(foundTeacher.birth)
    }

    return res.render("teacher/edit", { teacher })
}


