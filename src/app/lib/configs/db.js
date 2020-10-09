const {Pool} =require ("pg")
module.exports = new Pool({
    user:"postgres",
    password:"3047",
    host:"localhost",
    port:5432,
    database:"my_teacher"
})