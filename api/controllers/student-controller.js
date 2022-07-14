/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Student = require("../models/student")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getStudents = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const students = await Student.getStudents()
   const schema = {
      students: "id_estudiante",
   }
   const studentsHal = createResourceHal(students, schema, page, limit)

   res.json(studentsHal)
}

const getStudentById = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const student = await Student.getStudentById(id)

   if (!student) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/students/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `Student with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(student)
      if (queryParams.fields) {
         arr = ["id_estudiante", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!student[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v1/students/${id}`,
                  },
               },
               statusCode: "400",
               errorCode: "BAD_REQUEST",
               message: "Bad request",
               devMessage: `Field ${fields[value]} not found`,
               timestamp: new Date().toISOString(),
            },
         })
      }
   }

   // HAL construction section
   const hal = {
      _links: {
         self: {
            href: `http://localhost:3000/api/v1/students/${id}`,
         },
      },
      student: fields.reduce((acc, field) => {
         acc[field] = student[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getStudents,
   getStudentById,
}
