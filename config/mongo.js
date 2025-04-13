const { MongoClient, ServerApiVersion } = require('mongodb');



const uri = "mongodb+srv://pauloferesin:senhaBanco@meucluster.mfvzhcx.mongodb.net/?retryWrites=true&w=majority&appName=MeuCluster";


// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

let dbInstance = null;

async function getDb() {
    if(dbInstance) return dbInstance
    try {
        await client.connect()
        dbInstance = client.db("api-monitor")
        return dbInstance
    } catch (error) { console.log(error) }
}

module.exports = getDb