/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getPrograms = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Plan_Formativo",
   }

   try {
      const programs = await client.query(queryConf)
      return programs.rows
   } catch (err) {
      console.error(`Error getting programs from DB:\n${err}`)
      throw err
   }
}

const getProgramByCode = async (id) => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Plan_Formativo WHERE codigo_plan_formativo = $1",
      values: [id],
   }

   try {
      const program = await client.query(queryConf)
      return program.rows[0]
   } catch {
      console.error(`Error getting program by id from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getPrograms,
   getProgramByCode,
}
