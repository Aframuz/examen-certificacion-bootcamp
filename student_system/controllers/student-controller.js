/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Student = require("../models/student")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getStudents = async (req, res) => {
   const { region, course } = req.query
   try {
      const students = await Student.getFilteredStudents(region, course)
      res.json(students)
   } catch (err) {
      console.error(`Error getting students from DB:\n${err}`)
      res.status(500).send("Error getting students Index")
   }
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getStudents,
}
