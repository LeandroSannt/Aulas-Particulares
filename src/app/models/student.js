const db = require("../lib/configs/db")
const {age , date} = require("../lib/utils")

module.exports ={

    all(callback){

        db.query(`SELECT * FROM students`, function (err,results){
            if (err) throw` Database error all ${err}`
                callback(results.rows)
        })
    },

    create(callback,data){
        const query = `
            INSERT INTO students(
                avatar_url,
                name,
                birth,
                email,
                yearschool, 
                timehour
            )VALUES($1,$2,$3,$4,$5,$6)
            RETURNING id
        `
        const values =[
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.yearschool,
            data.timehour
        ]

        db.query(query,values, function(err,results){
            if(err) throw `Database error create ${err}`
            callback(results.rows[0])
        })
    }
}