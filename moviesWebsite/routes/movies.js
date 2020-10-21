const express = require('express')
const router = express.Router() 
const { v4: uuidv4 } = require('uuid');

// localhost:3000/movies/
router.get('/',(req,res) => {
    res.render('movies', {allMovies: movies})
})


// localhost:3000/movies/create-movie
router.post('/create-movie',(req,res) => {
    
    const title = req.body.title 
    const description = req.body.description
    const genre = req.body.genre
    const posterURL = req.body.posterURL

    let movie = {movieId: uuidv4(), title: title, description: description, genre: genre, posterURL: posterURL}

    movies.push(movie)

    res.redirect('/movies')

})

router.post('/delete-movie', (req,res) => {
    
    const movieId = req.body.movieId

    movies = movies.filter(movie => {
        return movie.movieId != movieId
    })

    res.redirect('/movies')

})

router.post('/filter-movie', (req,res) => {

    const genre = req.body.genre
    console.log(genre)

    filteredMovies = movies.filter(movie => {
        return movie.genre == genre
        
    })

    res.render('movies', {allMovies: filteredMovies})

})

module.exports = router 