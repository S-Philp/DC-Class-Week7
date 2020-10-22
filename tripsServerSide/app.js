const express = require('express')
const app = express() 
const mustacheExpresss = require('mustache-express')
const session = require('express-session')
// const indexRouter = require('index')
const { v4: uuidv4 } = require('uuid');
// allow app to use static resources-in this case, the css file
app.use(express.static("css"))

// initialize the session 
app.use(session({
    secret: 'USEASECUREKEYHERE',
    resave: false,
    saveUninitialized: true
  }))

// all routes going to /index will be handled by indexRouter 
// app.use('index',authenticate,indexRouter)

let trips = [] 
let users = []

// allows the express to parse the urlencoded form data 
app.use(express.urlencoded()) // BODY PARSER 

// setting up mustache as a templating engine 
app.engine('mustache', mustacheExpresss())
// the pages are located in the views directory
app.set('views','./views')
// extension for all the pages 
app.set('view engine', 'mustache')


app.get('/', (req,res) => {
    res.render('index')
})

app.get('/index',authenticate, (req,res) => {
    res.render('index', {allTrips: trips})
})

app.get('/register', (req,res) => {
    res.render('register')
})

app.get('/login', (req,res) => {
    res.render('login')
})

app.post('/register', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    //put const in object
    let user = {username: username, password: password}
    users.push(user)
    console.log(users)

    res.redirect('login')
})

app.post('/login', (req, res) => {
    const username = req.body.username
    const password = req.body.password

    const returnUser = users.find(user => {
        return user.username == username && user.password == password
    })

    if(returnUser) {

        if(req.session) {
            req.session.isAuthenticated = true 
            req.session.username = username 

            res.render('index',{message2: `Welcome ${username}!`})
        }
    } else {
        res.render('login',{message: 'Username or password is incorrect'})
    }
})

// //authentication middleware
function authenticate(req,res,next) {
    if(req.session) {
        if(req.session.username) {
            //continue with client's original request
            next()
        } else {
            res.redirect('login')
        }
    }
}

app.post('/delete-trip',(req,res) => {
    
    const tripId = req.body.tripId
    console.log(tripId)
    trips = trips.filter(trip => {
        return trip.tripId != tripId
    })

    res.redirect('index')
    })


app.post('/create-trip',(req,res) => {

    // get the values from the body
    // title and priority are part of the body object which are based on the names of the textbox 
    const title = req.body.title
    const imageUrl = req.body.imageUrl
    const departureDate = req.body.departureDate
    const returnDate = req.body.returnDate
    const deleteButton = req.body.deleteButton
    const sessionUsername = req.session.username

    let trip = {sessionUsername: sessionUsername, tripId: uuidv4(), title: title, imageUrl: imageUrl, departureDate: departureDate, returnDate: returnDate, deleteButton: deleteButton}
    console.log(trip)
    trips.push(trip)

    // after the trip is added to the array 
    // we want to show the user the updated list of trips 

    // it will call the /index get action again 
    res.redirect('/index')

})

app.post('/sign-out',(req,res) => {
    const signOutButton = req.body.signOutButton
    
    let signOut = req.session.destroy
    console.log(signOut)
    signOut

    res.redirect('login')
})

// run the server 
app.listen(3000, () => {
    console.log('Server is running...')
})

