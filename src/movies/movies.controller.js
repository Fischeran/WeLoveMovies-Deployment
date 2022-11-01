const service = require("./movies.service");
const asyncErrorBoundary = require("../asyncErrorBoundary/asyncErrorBoundary");

async function list(req, res) {
const is_showing = req.query.is_showing

if (is_showing) {
    
    const data = await service.listIsShowing();
    res.json({ data }) 
} else {
const data = await service.list();
res.json({ data })
    }
}

async function read(req, res) {
    
    const {movie: data} = res.locals
    
    res.json({ data })
}

async function validateId(req, res, next) {
    const movieId = req.params.movieId
    const data = await service.read(movieId)

    if (data) {
        res.locals.movie = data
        next()
    } else {
        next({  status: 404, message: "Movie cannot be found."})
    }
}

async function movieIsShowingInTheaters(req, res) {
    const movieId = req.params.movieId
    const data = await service.readTheatersIsShowing(movieId)

    res.json({ data })
}

async function readReviews(req, res) {
    const movieId = req.params.movieId
    const data = await service.readReviews(movieId)
    

    res.json({ data })
}


module.exports = {
   list: asyncErrorBoundary(list),
   read: [validateId, read],
   IsShowingTheaters: [validateId, movieIsShowingInTheaters],
   readReviews,
}