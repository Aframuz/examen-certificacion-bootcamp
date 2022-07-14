/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getTutors = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Tutor",
   }

   try {
      const tutors = await client.query(queryConf)
      return tutors.rows
   } catch (err) {
      console.error(`Error getting tutors from DB:\n${err}`)
      throw err
   }
}

const getTutorByCode = async (id) => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Tutor WHERE codigo_tutor = $1",
      values: [id],
   }

   try {
      const tutor = await client.query(queryConf)
      return tutor.rows[0]
   } catch {
      console.error(`Error getting tutor by id from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getTutors,
   getTutorByCode,
}
