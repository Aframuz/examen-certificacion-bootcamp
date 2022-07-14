const { Region, District, Program, Module, Course, Tutor, Student } = require("../models")
const { createResourceHal } = require("../middleware/halify")

const schemas = {
   regions: {
      id: "codigo_region",
      getAll: Region.getRegions,
      getByCode: Region.getRegionByCode,
   },
   districts: {
      id: "codigo_comuna",
      getAll: District.getDistricts,
      getByCode: District.getDistrictByCode,
   },
   programs: {
      id: "codigo_plan_formativo",
      getAll: Program.getPrograms,
      getByCode: Program.getProgramByCode,
   },
   modules: {
      id: "codigo_modulo",
      getAll: Module.getModules,
      getByCode: Module.getModuleByCode,
   },
   courses: {
      id: "codigo_curso",
      getAll: Course.getCourses,
      getByCode: Course.getCourseByCode,
   },
   tutors: {
      id: "codigo_tutor",
      getAll: Tutor.getTutors,
      getByCode: Tutor.getTutorByCode,
   },
   students: {
      id: "id_estudiante",
      getAll: Student.getStudents,
      getByCode: Student.getStudentByCode,
   },
}

const getResource = async (req, res) => {
   const { resource } = req.params
   const { page = 1, limit = 10 } = req.query

   // Get collection from DB, create a schema, create HAL structure
   const resourceS = await schemas[resource].getAll()
   const schema = {
      [resource]: schemas[resource].id,
   }
   const resourceHal = createResourceHal(resourceS, schema, page, limit)

   res.json(resourceHal)
}

const getResourceByCode = async (req, res) => {
   const { id } = req.params
   const { resource } = req.params
   const qs = req.query

   // Get resource from DB
   const resourceByCode = await schemas[resource].getByCode(id)

   // Return error if resource not found
   if (!resourceByCode) {
      return res.status(404).json({
         error: {
            _links: {
               self: {
                  href: `/api/v1/${resource}/${id}`,
               },
            },
            statusCode: 404,
            errorCode: "NOT_FOUND",
            message: "Requested resource not found",
            devMessage: `${resource} with id ${id} not found`,
            timestamp: new Date().toISOString(),
         },
      })
   }

   // Get fields from query string
   const fields = ((queryParams) => {
      let arr = Object.keys(resourceByCode)
      if (queryParams.fields) {
         arr = [schemas[resource].id, ...queryParams.fields.split(",")]
         return arr
      } else {
         return arr
      }
   })(qs)

   // Check if fields are valid
   for (const value in fields) {
      if (!resourceByCode[fields[value]]) {
         return res.status(400).json({
            error: {
               _links: {
                  self: {
                     href: `http://localhost:3000/api/v2/${resource}/${id}`,
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

   // Create HAL structure
   const hal = {
      _links: {
         self: {
            href: `http://localhost:3000/api/v2/${resource}/${id}`,
         },
      },
      course: fields.reduce((acc, field) => {
         acc[field] = resourceByCode[field]
         return acc
      }, {}),
   }

   return res.json(hal)
}

module.exports = {
   getResource,
   getResourceByCode,
}
