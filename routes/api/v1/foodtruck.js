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

router.post('/menu' , async(request, response) => {
    const { name, description, price, url } = request.body
    const newMenuItem = { name, description, price, url}

    const collection = await getMenu()
    const result = await collection.insertOne(newMenuItem)
    
    //response.send(newMenuItem)
    response.redirect('../../index.html')
})

router.post('/events' , async(request, response) => {
    const { name, location, date, time } = request.body
    const newEventItem = { name, location, date, time}

    const collection = await getEvents()
    const result = await collection.insertOne(newEventItem)

    //response.send(newEventItem)
    response.redirect('../../index.html')
})

router.get('/menu/:id', async (request,response)=>{
    const {id} = request.params
    const collection = await getMenu()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})

router.get('/events/:id', async (request,response)=>{
    const {id} = request.params
    const collection = await getEvents()
    const found = await collection.findOne({ _id: new ObjectId(id) })
    if (found) response.send(found)
    else response.send({ error: { message: `Could not find menu item with id: ${id}` }})
})

module.exports = router