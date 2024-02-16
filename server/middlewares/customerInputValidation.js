const validator = require("validator");
const ErrorResponse = require("../utils/errorResponse");

const customerInputValidation = (req, res, next) => {
    const { name, username, email } = req.body;

    if (!name || !username || !email) {
        return next(new ErrorResponse("Name, Username & Email is required", 400));
    }

    // Validate Email
    if (!validator.isEmail(email)) {
        return next(new ErrorResponse("Please provide a valid email", 400));
    }

    // Validate Name
    if (!validator.isLength(name, { min: 3, max: 30 })) {
        return next(new ErrorResponse("Name must be between 3 and 30 characters", 400));
    }

    // Validate Username
    if (!validator.isLength(username, { min: 3, max: 30 })) {
        return next(new ErrorResponse("Username must be between 3 and 30 characters", 400));
    }

    // Trim values
    req.body.name = String(name).trim();
    req.body.username = String(username).trim();
    req.body.email = String(email).trim();

    next();
}

module.exports = customerInputValidation;