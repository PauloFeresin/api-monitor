const { ObjectId } = require("mongodb")
const getDb = require("../config/mongo")

// Lista as APIs registradas
async function getApis(){
    try{
        const db = await getDb()
        const apis = await db.collection("apisMonitored").find().toArray()
        return apis
    } catch( error) {
        throw(error)
    }
}

// Registra uma API para monitoramento
async function registerApi(apiData){
    try{
        const db = await getDb()
        const result = await db.collection("apisMonitored").insertOne(apiData)
        return result.insertedId;
    } catch(error){
        console.error(error)
    }
}

// Atualiza uma API
async function updateApi(id, apiData) {
    const db = await getDb()
    const result = await db.collection("apisMonitored").updateOne(
        { _id: new ObjectId(id) },
        { $set: apiData }
    )
    return result.modifiedCount > 0
}

// Deleta uma API
async function deleteApi(id) {
    const db = await getDb()
    const result = await db.collection("apisMonitored").deleteOne(
        { _id: new ObjectId(id) }
    )
    return result.deletedCount > 0
}


module.exports = {getApis, registerApi, updateApi, deleteApi}



