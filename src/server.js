const dotenv = require("dotenv")
const express = require('express')
const nunjucks = require("nunjucks")
const routes =require("./routes")
const methodOverride= require("method-override")
const cors = require("cors")

const server = express()

dotenv.config()
server.use(cors())
server.use(express.urlencoded({extended:true}))
server.use(express.static('public'))
server.use(methodOverride("_method"))
server.use(routes)

server.set("view engine" , "njk")

nunjucks.configure("src/app/views",{
    express:server,
    autoescape:false,
    noCache:true

})

server.listen(process.env.PORT || 5002,function(){
    console.log("server is running")
})