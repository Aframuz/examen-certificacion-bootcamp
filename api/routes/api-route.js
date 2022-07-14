/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const apiCtrl = require("../controllers/api-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/:resource").get(apiCtrl.getResource)
router.route("/:resource/:id").get(apiCtrl.getResourceByCode)
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
