/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getDistricts = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Comuna",
   }

   try {
      const districts = await client.query(queryConf)
      return districts.rows
   } catch (err) {
      console.error(`Error getting districts from DB:\n${err}`)
      throw err
   }
}

const getDistrictByCode = async (id) => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Comuna WHERE codigo_comuna = $1",
      values: [id],
   }

   try {
      const district = await client.query(queryConf)
      return district.rows[0]
   } catch {
      console.error(`Error getting district by id from DB:\n${err}`)
      throw err
   }
}
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getDistricts,
   getDistrictByCode,
}
