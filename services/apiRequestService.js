const axios = require("axios");
const fs = require("node:fs")
const { performance } = require('perf_hooks')
const { createLog } = require("./logService")
const getDb = require("../config/mongo");




async function executeRequest(api) {
    const responseTime = performance.now()
    try {
        let response;

        if (api.method === "GET") {
            response = await axios.get(api.url)
        } else if (api.method === "POST") {
            response = await axios.post(api.url, api.payload)
        }

        const duration = (performance.now() - responseTime).toFixed(2)

        const content = {
            url: api.url,
            method: api.method,
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            requestTime: duration,
            timeStamp: new Date().toISOString(),
            responseSize: response?.data ? JSON.stringify(response.data).length : 0,
            responseSnippet: response?.data ? JSON.stringify(response.data).substring(0, 100) : null,


        };
        // console.log(content) 
        await createLog(content)

        // fs.appendFile("logs.log", JSON.stringify(content) + "\n", error => {
        //     if (error) {
        //         console.error(error)
        //     }
        // })

    } catch (error) {
        const errorLog = {
            url: api.url,
            method: api.method,
            error: error.message,
            stack: error.stack,
            timeStamp: new Date().toISOString(),

        }

        await createLog(errorLog)

        // console.error(errorLog)
        // fs.appendFile("logs.log", JSON.stringify(errorLog) + "\n", error => {
        //     if (error) console.error(error)
        // })
    }
}

// Função aux para dar um intervalo entre os repeats
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
};


async function makeRequest() {
    const db = await getDb()
    const apis = await db.collection("apisMonitored").find().toArray();

    for (let api of apis) {
        for (let i = 0; i < api.repeat; i++) {
            await executeRequest(api)
            await delay(1000)
        }
    }
}


module.exports = makeRequest



