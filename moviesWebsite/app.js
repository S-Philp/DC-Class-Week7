const express = require('express')
const app = express()
const router = express.Router() 
const mustacheExpress = require('mustache-express')
const { v4: uuidv4 } = require('uuid');


// allow app to use static resources-in this case, the css file
app.use(express.static("css"))

// allows the express to parse the urlencoded form data 
app.use(express.urlencoded()) // BODY PARSER 

const moviesRouter = require('./routes/movies')


// global.movies mean that you can access trips from express routers 
global.movies = [] 

// localhost:3000/movies -> moviesRouter is going to handle it 
// localhost:3000/movies/create-movie -> moviesRouter is going to handle it
// localhost:3000/movies/delete-movie -> moviesRouter is going to handle it
app.use('/movies',moviesRouter)


// setting up Express to use Mustache Express as template pages 
app.engine('mustache', mustacheExpress())
    // the pages are located in views directory
app.set('views', './views')
    // extension will be .mustache
app.set('view engine', 'mustache')

// localhost:3000/movies/
router.get('/',(req,res) => {
    res.render('movies', {allMovies: movies})
})



app.listen(3000,() => {
    console.log('Server is running...')
})