const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")


function list(){
    return knex("movies").select("*");
}

function listIsShowing(){
    return knex("movies as m")
    .distinct('m.title', 'm.movie_id', 'm.runtime_in_minutes', 'm.rating', 'm.description', 'm.image_url')
            .where("is_showing", true)
            .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")         
}


function read(movieId) {
    return knex("movies")
            .select("*")
            .where({ movie_id: movieId})
            .first()
}

function readTheatersIsShowing(movieId) {
//join theaters table and movies_theaters
//need all fields from theaters and m.movie_id and mt.is_showing

    return knex("movies as m")
            .select('t.*', 'm.movie_id', 'mt.is_showing')
            .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
            .join('theaters as t', 't.theater_id', 'mt.theater_id')
            .where("is_showing", true)
            .andWhere({ "m.movie_id": movieId})

}

/* 
const addCategory = mapProperties({
  category_id: "category.category_id",
  category_name: "category.category_name",
  category_description: "category.category_description",
}); */

const addCritic = mapProperties({
    critic: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created: "critic.created_at",
    updated: "critic.updated_at",
})

function readReviews(movieId){
    //join reviews and critics 
    return knex("reviews as r")
            .select('r.*', 'c.critic_id as critic', 'c.preferred_name', 'c.surname', 
            'c.organization_name', 'c.created_at as created', 'c.updated_at as updated')
            .join('critics as c', 'c.critic_id', 'r.critic_id')
            .where({ "r.movie_id": movieId})
            .then(response => {
              return response.map(element => 
                addCritic(element)
            )
            })
}



module.exports = {
    list,
    listIsShowing,
    read,
    readTheatersIsShowing,
    readReviews
    
}