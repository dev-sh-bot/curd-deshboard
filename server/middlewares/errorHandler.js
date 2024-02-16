const ErrorResponse = require("../utils/errorResponse")

const errorHandler = (err, req, res, next) => {
    let error = { ...err };

    error.message = err.message;

    // Handle the specific error when casting to ObjectId fails
    if (err.kind == "ObjectId") {
        const message = "Invalid customer ID format";
        error = new ErrorResponse(message, 400);
    }

    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || "Server Error"
    });
};

module.exports = errorHandler;
module.exports = errorHandler