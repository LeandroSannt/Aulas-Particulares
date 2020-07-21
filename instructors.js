const fs =require('fs')
const data = require("./data.json")

exports.post =function(req, res){

    const keys =Object.keys(req.body)
    for(key of keys){
        if(req.body[key]=="")
        return res.send("Dados faltando")
    }

    let {avatar_url,birth,name,escolaridade,gender,services} =req.body

    birth= Date.parse(birth)
    const create_at = Date.now()
    const id = Number(data.instructors.length+1)

    data.instructors.push({
        id,
        name,
        create_at,
        birth,
        services,
        gender,
        escolaridade,
        avatar_url
    })


fs.writeFile("data.json",JSON.stringify(data,null,2),function(err){
 
    if(err) return res.send("algum erro")
    

    return res.redirect("/teachers")
})
}


  
