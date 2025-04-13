const getDb = require("../config/mongo")



async function createLog(logData){
    try{ 
        const db = await getDb()
        await db.collection("apiLogs").insertOne(logData)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {createLog}