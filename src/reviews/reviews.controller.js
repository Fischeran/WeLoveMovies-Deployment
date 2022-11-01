const service = require("./reviews.service")

async function validateId(req, res, next) {
    
    const find = await service.list()
    const found = find.find(review => review.review_id === Number(req.params.reviewId))

   if (found) { 
    res.locals.review = found;
    next() 
} else {
next({ status: 404, message: `/cannot be found/i`})
}
}

async function update(req, res) {
    const updated = {
        ...req.body.data,
        review_id: res.locals.review.review_id
    }
    const id = req.params.reviewId
    await service.put(updated)
    const data = await service.readUpdated(id)

    res.json({ data })
}

async function destroy(req, res) {

await service.destroy(req.params.reviewId)
res.sendStatus(204)

}



module.exports = {
    update: [validateId, update],
    destroy: [validateId, destroy]
}