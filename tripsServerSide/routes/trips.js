const express = require('express')
// const app = express()
// const mustacheExpresss = require('mustache-express')
// const session = require('express-session')
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcryptjs');
const router = express.Router()


router.get('/trips', (req, res) => {
    res.render('trips', { allTrips: trips })
})
console.log('testfire')
router.post('/create-trip', (req, res) => {

    // get the values from the body
    // title and priority are part of the body object which are based on the names of the textbox 
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const departureDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const deleteButton = req.body.deleteButton
    const sessionUsername = req.session.username

    let trip = { sessionUsername: sessionUsername, tripId: uuidv4(), title: title, imageUrl: imageUrl, departureDate: departureDate, returnDate: returnDate, deleteButton: deleteButton }
    console.log(trip)
    trips.push(trip)

    // after the trip is added to the array 
    // we want to show the user the updated list of trips 

    // it will call the /trips get action again 
    res.redirect('/trips')

})

router.post('/delete-trip', (req, res) => {

    const tripId = req.body.tripId
    console.log(tripId)
    trips = trips.filter(trip => {
        return trip.tripId != tripId
    })

    res.redirect('trips')
})



module.exports = router