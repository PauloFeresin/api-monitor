const express = require("express")
const routes = require("./routes/api/index.js")

const app = express()

app.use(express.json())
app.use("/api", routes)

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000")
})

// Quando o servidor subir, isso já roda os jobs
// require("./jobs")