/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Course = require("../models/course")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getCourses = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const courses = await Course.getCourses()
   const schema = {
      courses: "codigo_curso",
   }
   const coursesHal = createResourceHal(courses, schema, page, limit)

   res.json(coursesHal)
}

const getCourseByCode = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const course = await Course.getCourseByCode(id)

   if (!course) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/courses/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `Course with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(course)
      if (queryParams.fields) {
         arr = ["codigo_curso", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!course[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v2/courses/${id}`,
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
            href: `http://localhost:3000/api/v2/courses/${id}`,
         },
      },
      course: fields.reduce((acc, field) => {
         acc[field] = course[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getCourses,
   getCourseByCode,
}
