const router = require('express').Router()
const {getCollection, ObjectId} =require("../../../dbconnect.js")
let collectionEvents = null
let collectionMenu = null

const getMenu = async () =>{
    if (!collectionMenu) collectionMenu = await getCollection('food-truck','menu')
    return collectionMenu
}

const getEvents = async () =>{
    if (!collectionEvents) collectionEvents = await getCollection('food-truck','events')
    return collectionEvents
}

router.get('/menu', async (request,response)=>{
    const collection = await getMenu()
    const found = await collection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find any menu items' }})
})

router.get('/events', async (request,response)=>{
    const collection = await getEvents()
    const found = await collection.find().toArray()
    if (found) response.send(found)
    else response.send({ error: { message: 'Could not find any events' }})
})

module.exports = router