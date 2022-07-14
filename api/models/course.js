/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getCourses = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Curso",
   }

   try {
      const courses = await client.query(queryConf)
      return courses.rows
   } catch (err) {
      console.error(`Error getting courses from DB:\n${err}`)
      throw err
   }
}

const getCourseByCode = async (id) => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Curso WHERE codigo_curso = $1",
      values: [id],
   }

   try {
      const course = await client.query(queryConf)
      return course.rows[0]
   } catch {
      console.error(`Error getting course by id from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getCourses,
   getCourseByCode,
}
