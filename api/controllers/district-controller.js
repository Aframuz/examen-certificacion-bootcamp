/*=============================================
=              IMPORT MODULES                =
=============================================*/
// Local modules
const District = require("../models/district")
const { createResourceHal } = require("../middleware/halify")
/*=============================================
=                  HANDLERS                   =
=============================================*/
// Get
const getDistricts = async (req, res) => {
   const { page = 1, limit = 10 } = req.query

   const districts = await District.getDistricts()
   const schema = {
      districts: "codigo_comuna",
   }
   const districtHal = createResourceHal(districts, schema, page, limit)

   res.json(districtHal)
}

const getDistrictByCode = async (req, res) => {
   const { id } = req.params
   const qs = req.query

   const district = await District.getDistrictByCode(id)

   if (!district) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/districts/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `District with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   const fields = ((queryParams) => {
      let arr = Object.keys(district)
      if (queryParams.fields) {
         arr = ["codigo_comuna", ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   for (const value in fields) {
      if (!district[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v1/districts/${id}`,
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
            href: `http://localhost:3000/api/v1/districts/${id}`,
         },
      },
      district: fields.reduce((acc, field) => {
         acc[field] = district[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = {
   getDistricts,
   getDistrictByCode,
}
