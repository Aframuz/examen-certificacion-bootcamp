/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Module = require("../models/module")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getModules = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const modules = await Module.getModules()
   const schema = {
      modules: "codigo_modulo",
   }
   const studentsHal = createResourceHal(modules, schema, page, limit)

   res.json(studentsHal)
}

const getModuleByCode = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const module = await Module.getModuleByCode(id)

   if (!module) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/modules/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `Module with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(module)
      if (queryParams.fields) {
         arr = ["codigo_modulo", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!module[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v1/modules/${id}`,
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
            href: `http://localhost:3000/api/v1/modules/${id}`,
         },
      },
      module: fields.reduce((acc, field) => {
         acc[field] = module[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getModules,
   getModuleByCode,
}
