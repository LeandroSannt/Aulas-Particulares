const express = require("express")
const routes = express.Router()
const teachers = require("./instructors")

routes.get("/", function (req, res) {
    return res.redirect("/teacher")
})

routes.get("/teacher", function (req, res) {
    return res.render("teacher/teachers")
})


routes.get("/students", function (req, res) {
    return res.render("students")

})

routes.get("/teacher/create", function (req, res) {
    return res.render("teacher/create")
})


routes.get("/teacher/:id", teachers.show)
routes.get("/teacher/:id/edit", teachers.edit)
routes.post("/teacher", teachers.post)
routes.put("/teacher", teachers.put)
routes.delete("/teacher", teachers.delete)



routes.get("/not-found", function (req, res) {
    return res.render("not-found")
})

routes.use(function (req, res) {
    res.status(404).render("not-found");
});

module.exports = routes