const PublishService = require("../services/publisher.service");
const MongoBD = require("../utils/mongodb.util");
const ApiError = require("../api-error");

//Create and Save a new Contact
exports.create = async (req, res, next) => {
    if (!req.body?.name || !req.body?.address) {
        return next(new ApiError(400, "Thông tin nhà xuất bản cần điền vào đầy đủ!"));
    }

    try {
        const publishService = new PublishService(MongoBD.client);
        const document = await publishService.create(req.body);
        return res.send(document);
    } catch (error) {
        return next(
            new ApiError(500, "An error occurred while creating the Book")
        );
    }
};

// Find all book
exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const publishService = new PublishService(MongoBD.client);
        documents = await publishService.find({});
    } catch (error) {
        return next(
            new ApiError(500, "An errer occured while retrieving books")
        );
    }
    return res.send(documents);
};

// //Find Book
exports.findOne = async (req, res, next) => {
    try {
        const publishService = new PublishService(MongoBD.client);
        const document = await publishService.findByTitle(req.body.title);
        if (document.length > 0) {
            res.send(document);
        } else {
            return next(new ApiError(400, `Không tìm thấy sách với tiêu đề là ${req.body.title}`));
        }
    } catch (error) {
        return next(new ApiError(500, `An error occurred while finding books by title`));
    }
}

//Find book by ID
exports.findById = async (req, res, next) => {
    try {
        const publishService = new PublishService(MongoBD.client);
        const document = await publishService.findById(req.params.id);
        if (!document) {
            return next(new ApiError(400, "Book not found"));
        }
        return res.send(document);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving book with id=${req.params.id}`));
    }
};

//Update book
exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, "Data to update can not be emtpy"));
    }
    try {
        const publishService = new PublishService(MongoBD.client);
        const document = await publishService.update(req.params.id, req.body);
        if (!document) {
            return next(new ApiError(404, "Book not found"));
        }
        return res.send({ message: "Book was update successfully" });
    } catch (error) {
        return next(
            new ApiError(500, `Error updating book with id=${req.params.id}`)
        );
    }
};

//Delete book
exports.delete = async (req, res, next) => {
    try {
        const publishService = new PublishService(MongoBD.client);
        const document = await publishService.delete(req.params.id);
        if (!document) {
            return next(new (404, "Book not found"));
        }
        return res.send({ message: "Book was deleted successfully" });
    } catch (error) {
        return next(new ApiError(500, `Could not delete book with id=${req.params.id}`));
    }
};
