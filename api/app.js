const express = require("express")
const apiRoute = require("./routes/api-route")

const app = express()

app.use("/api/v1", apiRoute)

app.listen(3000, () => console.log("Server started on port 3000"))
