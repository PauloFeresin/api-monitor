const cron = require("node-cron")
const makeRequest = require("../services/apiRequestService.js")

cron.schedule("*/10 * * * * *", () => {
    makeRequest()
    console.log("Requisitando APIs")
})

