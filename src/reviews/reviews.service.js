const knex = require("../db/connection")
const mapProperties = require("../utils/map-properties")

function put(updatedReview) {
    console.log(updatedReview)
    return knex("reviews")
            .select("*")
            .where({ review_id: updatedReview.review_id })
            .update(updatedReview, "*")

}

function list() {
    return knex("reviews").select("*");
}

const addCritic = mapProperties({
    critic: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created: "critic.created_at",
    updated: "critic.updated_at",
})

function readUpdated(id) {
    return knex("reviews as r")
            .where({"r.review_id": id})
            .join("critics as c", "c.critic_id", "r.critic_id")
            .select("r.*", 'c.critic_id as critic', 'c.preferred_name', 'c.surname', 
            'c.organization_name', 'c.created_at as created', 'c.updated_at as updated')
            .first()
            .then(addCritic)
}

function destroy(id) {

    return knex("reviews")
        .where({"review_id": id})
        .del()

}

module.exports = {
    put,
    readUpdated,
    list,
    destroy
}