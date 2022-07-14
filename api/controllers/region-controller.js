/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const Region = require("../models/region")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getRegions = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const regions = await Region.getRegions()
   const schema = {
      region: "codigo_region",
   }
   const regionHal = createResourceHal(regions, schema, page, limit)

   res.json(regionHal)
}

const getRegionByCode = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const region = await Region.getRegionByCode(id)

   if (!region) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/region/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `Region with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(region)
      if (queryParams.fields) {
         arr = ["codigo_region", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!region[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v1/regions/${id}`,
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
            href: `http://localhost:3000/api/v1/regions/${id}`,
         },
      },
      region: fields.reduce((acc, field) => {
         acc[field] = region[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getRegions,
   getRegionByCode,
}
