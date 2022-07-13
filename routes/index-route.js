/*=============================================
=              IMPORT MODULES                =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const indexCtrl = require("../controllers/index-controller")

/*=============================================
=                    INIT                     =
=============================================*/

const router = express.Router()

/*=============================================
=                   ROUTES                    =
=============================================*/
router.route("/").get(indexCtrl.getIndex)
/*=============================================
=                   EXPORTS                   =
=============================================*/
module.exports = router
