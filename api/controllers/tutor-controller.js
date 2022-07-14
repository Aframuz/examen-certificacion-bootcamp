/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Tutor = require("../models/tutor")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getTutors = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const tutors = await Tutor.getTutors()
   const schema = {
      tutors: "codigo_tutor",
   }
   const tutorsHal = createResourceHal(tutors, schema, page, limit)

   res.json(tutorsHal)
}

const getTutorByCode = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const tutor = await Tutor.getTutorByCode(id)

   if (!tutor) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/tutors/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `Tutor with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(tutor)
      if (queryParams.fields) {
         arr = ["codigo_tutor", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!tutor[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v1/tutors/${id}`,
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
            href: `http://localhost:3000/api/v1/tutors/${id}`,
         },
      },
      tutor: fields.reduce((acc, field) => {
         acc[field] = tutor[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getTutors,
   getTutorByCode,
}
