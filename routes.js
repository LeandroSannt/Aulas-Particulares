const express = require("express")
const routes = express.Router()
const teachers = require("./controllers/instructors")
const students = require("./controllers/students")

routes.get("/", function (req,res){
    return res.redirect("teacher")
})

routes.get("/teacher", teachers.table)
routes.get("/teacher/create", teachers.create)
routes.get("/teacher/:id", teachers.show)
routes.get("/teacher/:id/edit", teachers.edit)
routes.post("/teacher", teachers.post)
routes.put("/teacher", teachers.put)
routes.delete("/teacher", teachers.delete)



/*======Students======*/

routes.get("/students", students.table)
routes.get("/students/create", students.create)
routes.get("/students/:id", students.show)
routes.get("/students/:id/edit", students.edit)
routes.post("/students", students.post)
routes.put("/students", students.put)
routes.delete("/students", students.delete)


routes.get("/not-found", function (req, res) {
    return res.render("not-found")
})

routes.use(function (req, res) {
    res.status(404).render("not-found");
});

module.exports = routes