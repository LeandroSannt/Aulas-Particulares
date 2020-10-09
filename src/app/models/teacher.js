var {age , date} = require("../lib/utils")
var db = require("../lib/configs/db")

module.exports = {
    all(callback){ 
        db.query(`
            SELECT *  FROM teachers ORDER BY name ASC`, function(err , results){
            if(err)throw `Database Error ! ${err}`
                callback(results.rows)
    })   
    },

    create( data, callback){
        var query =  `
            INSERT INTO teachers (
                avatar_url,
                name,
                birth,
                escolaridade,
                availability,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
        `
        var values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.escolaridade,
            data.availability,
            data.services,
            date(Date.now()).iso
        ]
        
        db.query(query, values, function(err , results){
            if(err) throw `Database Error ! ${err}`
                callback(results.rows[0])
        })
    },

    find(id , callback){
       db.query(`SELECT * FROM teachers WHERE id = $1`, [id], function(err , results){
                if(err) throw `Database Error ! ${err}`
                callback(results.rows[0])
        })
    },

   /* update(data , callback){
        var query = `
            UPDATE teachers SET
            avatar_url =($1),
            name = ($2),
            birth_date =($3),
            education_level =($4),
            class_type =($5),
            subjects_taught =($6)
            WHERE id = $7
        `
        var values = [
            data.avatar_url,
            data.name,
            date(data.birth_date).iso,
            data.education_level,
            data.class_type,
            data.subjects_taught,
            data.id
        ]

        db.query(query, values, function (err , results){
            if(err){ throw `Database Error! ${err}`}
                callback()
        })
    },

    delete(id , callback){
        db.query(`DELETE FROM teachers WHERE id = $1`, [id], function(err , results){
            if(err){ throw `Database Error ! ${err}`}
            return callback()
        })
    }*/
} 