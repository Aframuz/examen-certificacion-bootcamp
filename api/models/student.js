/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getStudents = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Estudiante",
   }

   try {
      const students = await client.query(queryConf)
      return students.rows
   } catch (err) {
      console.error(`Error getting students from DB:\n${err}`)
      throw err
   }
}

const getStudentById = async (id) => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Estudiante WHERE id_estudiante = $1",
      values: [id],
   }

   try {
      const student = await client.query(queryConf)
      return student.rows[0]
   } catch {
      console.error(`Error getting student by id from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getStudents,
   getStudentById,
}
