const express = require("express");
const publishers = require("../controllers/publisher.controller");

const router = express.Router();

router.route('/add')
    .post(publishers.create);

router.route('/')
    .get(publishers.findAll)
    .post(publishers.findOne);

router.route('/:id')
    .get(publishers.findById)
    .put(publishers.update)
    .delete(publishers.delete);

module.exports = router;