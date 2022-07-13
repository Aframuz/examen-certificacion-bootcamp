/*=============================================
=               IMPORT MODULES                =
=============================================*/
// Local modules
const client = require("../config/db.config")

/*=============================================
=                   QUERIES                   =
=============================================*/
// Get
const getRegions = async () => {
   // Query Conf
   const queryConf = {
      text: "SELECT * FROM Region",
   }

   try {
      const regions = await client.query(queryConf)
      return regions.rows
   } catch (err) {
      console.error(`Error getting regions from DB:\n${err}`)
      throw err
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getRegions,
}
