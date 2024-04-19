const express = require("express");
const borrowBooks = require("../controllers/order_books.controller");

const router = express.Router();

router.route('/:id')
    .put(borrowBooks.update)
    .get(borrowBooks.findOne)

router.route('/')
    .post(borrowBooks.create)
    .get(borrowBooks.findAll);

module.exports = router;