const {MongoClient, ObjectId} = require('mongodb')
const {uri} = require('./secrets/mongodb.json')
const client = new MongoClient(uri)
const getCollection = async (dbName, collectionName) => {
    await client.connect()
    return client.db(dbName).collection(collectionName)

}


//testing db connection
let collection = null
const test = async () => {
    if (!collection) collection = await getCollection('food-truck', 'menu')
        console.log(await collection.findOne())
    return collection

    
}

//test()



module.exports = { getCollection, ObjectId }