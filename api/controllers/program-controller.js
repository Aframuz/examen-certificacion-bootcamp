/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Program = require("../models/program")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getPrograms = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const programs = await Program.getPrograms()
   const schema = {
      programs: "codigo_plan_formativo",
   }
   const programsHal = createResourceHal(programs, schema, page, limit)

   res.json(programsHal)
}

const getProgramByCode = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const program = await Program.getProgramByCode(id)

   if (!program) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/programs/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `Program with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(program)
      if (queryParams.fields) {
         arr = ["codigo_plan_formativo", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!program[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v1/programs/${id}`,
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
            href: `http://localhost:3000/api/v1/programs/${id}`,
         },
      },
      program: fields.reduce((acc, field) => {
         acc[field] = program[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getPrograms,
   getProgramByCode,
}
