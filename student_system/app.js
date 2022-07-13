/*=============================================
=               IMPORT MODULES               =
=============================================*/
// 3rd party modules
const express = require("express")
// Local modules
const indexRoute = require("./routes/index-route")
const studentRoute = require("./routes/student-route")
// Core modules
const path = require("path")
/*=============================================
=                  VARIABLES                  =
=============================================*/
const PORT = process.env.PORT || 3000
const publicDir = path.join(__dirname, "public")
const app = express()
/*=============================================
=         MIDDLEWARE & APP SETTINGS           =
=============================================*/
app.use(express.static(publicDir))

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine", "pug")
/*=============================================
=                   ROUTES                    =
=============================================*/
/** routes here */
app.use("/", indexRoute)
app.use("/students", studentRoute)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
