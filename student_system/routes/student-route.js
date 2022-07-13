/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const studentCtrl = require("../controllers/student-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(studentCtrl.getStudents)
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
