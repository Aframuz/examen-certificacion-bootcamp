/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getModules = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Modulo",
   }

   try {
      const modules = await client.query(queryConf)
      return modules.rows
   } catch (err) {
      console.error(`Error getting modules from DB:\n${err}`)
      throw err
   }
}

const getModuleByCode = async (id) => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Modulo WHERE codigo_modulo = $1",
      values: [id],
   }

   try {
      const module = await client.query(queryConf)
      return module.rows[0]
   } catch {
      console.error(`Error getting module by id from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getModules,
   getModuleByCode,
}
