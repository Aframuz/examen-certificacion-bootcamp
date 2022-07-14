/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const studentCtrl = require("../controllers/student-controller")
const tutorCtrl = require("../controllers/tutor-controller")
const regionCtrl = require("../controllers/region-controller")
const districtCtrl = require("../controllers/district-controller")
const courseCtrl = require("../controllers/course-controller")
const moduleCtrl = require("../controllers/module-controller")
const programCtrl = require("../controllers/program-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/students").get(studentCtrl.getStudents)
router.route("/students/:id").get(studentCtrl.getStudentById)
router.route("/tutors").get(tutorCtrl.getTutors)
router.route("/tutors/:id").get(tutorCtrl.getTutorByCode)
router.route("/regions").get(regionCtrl.getRegions)
router.route("/regions/:id").get(regionCtrl.getRegionByCode)
router.route("/districts").get(districtCtrl.getDistricts)
router.route("/districts/:id").get(districtCtrl.getDistrictByCode)
router.route("/courses").get(courseCtrl.getCourses)
router.route("/courses/:id").get(courseCtrl.getCourseByCode)
router.route("/modules").get(moduleCtrl.getModules)
router.route("/modules/:id").get(moduleCtrl.getModuleByCode)
router.route("/programs").get(programCtrl.getPrograms)
router.route("/programs/:id").get(programCtrl.getProgramByCode)
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
