var {age , date} = require("../lib/utils")
var db = require("../lib/configs/db")

module.exports = {
    all(callback){ 
        db.query(`
            SELECT *  FROM students`, function(err , results){
            if(err)throw `Database Error All ! ${err}`
                callback(results.rows)
        })   
    },

    create( data, callback){
        var query =  `
            INSERT INTO students (
                avatar_url,
                name,
                birth,
                email,
                yearschool,
                timehour,
                teacher_id
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING id
        `
        var values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.yearschool,
            data.timehour,
            data.teacher
        ]
        db.query(query, values, function(err , results){
            if(err) throw `Database Error Create ! ${err}`
                callback(results.rows[0])
        })
    },

   find(id , callback){
       db.query(`SELECT  students.*, teachers.name AS teacher_name
       FROM students
       LEFT JOIN teachers ON (students.teacher_id = teachers.id)
       WHERE students.id = $1`, [id], function(err , results){
                if(err) throw `Database Error ! ${err}`
                callback(results.rows[0])
        })
    },

    update(data , callback){
        var query = `
            UPDATE students SET
            avatar_url =($1),
            name = ($2),
            birth =($3),
            email =($4),
            yearschool =($5),
            timehour =($6),
            teacher_id=($7)
            WHERE id = $8
        `
        var values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.email,
            data.yearschool,
            data.timehour,
            data.teacher,
            data.id
        ]

        db.query(query, values, function (err , results){
            if(err){ throw `Database Error! ${err}`}
                callback()
        })
    },

    delete(id , callback){
        db.query(`DELETE FROM students WHERE id = $1`, [id], function(err , results){
            if(err){ throw `Database Error ! ${err}`}
            return callback()
        })
    },

    teacherSelectOptions(callback){
        db.query(`
        SELECT name,id FROM teachers`, function(err , results){
        if(err)throw `Database Error All ! ${err}`
            callback(results.rows)
        })   
    },

    paginate(params){
        const {filter,limit,offset,callback} = params

        let query ="",
            filterQuery ="",
            totalQuery=`(
            SELECT count(*) FROM students
        ) AS total `

            if(filter){
                filterQuery =`
                WHERE students.name ILIKE '%${filter}%'
                OR students.email ILIKE '%${filter}%'
                `
                totalQuery =`(
                    SELECT count (*) FROM students
                     ${filterQuery}
                ) as total`
            }

            query =`
            SELECT students. *, ${totalQuery}
            FROM students
            ${filterQuery}
            LIMIT $1 OFFSET $2`

            db.query(query,[limit,offset],function(err,results){
                if(err) throw "Database error"

                callback(results.rows)
            })
        } 
    }   