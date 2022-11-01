const router = require("express").Router();
const controller = require("./reviews.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/:reviewId").put(controller.update).delete(controller.destroy).all(methodNotAllowed)
router.route("/").all(methodNotAllowed)


module.exports = router