/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Region = require("../models/region")
const Course = require("../models/course")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getIndex = async (req, res) => {
   try {
      const regions = await Region.getRegions()
      const courses = await Course.getCourses()

      // Ordering
      regions.sort((a, b) => {
         return a.codigo_region - b.codigo_region
      })
      courses.sort((a, b) => {
         return a.codigo_curso - b.codigo_curso
      })

      res.status(200).render("index", {
         regions,
         courses,
      })
   } catch (err) {
      console.error(`Error getting collections from DB:\n${err}`)
      res.status(500).send("Error getting rendering Index")
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getIndex,
}
