const express = require('express')
const app = express() 
const mustacheExpresss = require('mustache-express')
//const cors = require('cors')
// const { v4: uuidv4 } = require('uuid');
// allow app to use static resources-in this case, the css file
app.use(express.static("css"))

let trips = [] 

// allows the express to parse the urlencoded form data 
app.use(express.urlencoded()) // BODY PARSER 

// setting up mustache as a templating engine 
app.engine('mustache', mustacheExpresss())
// the pages are located in the views directory
app.set('views','./views')
// extension for all the pages 
app.set('view engine', 'mustache')


// render index.mustache page for the root (/) route 
// app.get('/',(req,res) => {
//     res.render('index',{name: "Mary", age: 55})
// })

app.get('/', (req,res) => {
    res.redirect('index')
})

app.get('/index', (req,res) => {
    res.render('index', {allTrips: trips})
})

app.post('/delete-trip',(req,res) => {
    let deleteTrip = req.body.deleteTrip
    let newTrips = trips.filter((trip) => trip.title !=deleteTrip)
        trips = newTrips

        res.redirect('/index')
    })


app.post('/index',(req,res) => {

    // get the values from the body
    // title and priority are part of the body object which are based on the names of the textbox 
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const departureDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const deleteButton = req.body.deleteButton

    let trip = {title: title, imageUrl: imageUrl, departureDate: departureDate, returnDate: returnDate, deleteButton: deleteButton}
    trips.push(trip)

    // after the task is added to the array 
    // we want to show the user the updated list of tasks 

    // it will call the /tasks get action again 
    res.redirect('/index')

})

// run the server 
app.listen(3000, () => {
    console.log('Server is running...')
})

