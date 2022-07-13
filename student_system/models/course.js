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

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getCourses,
}
