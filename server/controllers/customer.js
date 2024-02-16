const Customer = require("../models/customer");
const ErrorResponse = require("../utils/errorResponse");
const fs = require('fs');
const path = require('path');

const getCustomer = async (req, res, next) => {
    console.log("Get Customer API")
    const { id } = req.params;

    if (!id) {
        return next(new ErrorResponse("Please provide customer id", 400));
    }

    try {
        const customer = await Customer.findById(id);

        if (!customer) {
            return next(new ErrorResponse("Customer not found", 404));
        }

        return res.status(200).json({ success: true, data: customer });
    } catch (error) {
        next(error);
    }
};

const getCustomers = async (req, res, next) => {
    const { _sort, _order, limit, page } = req.query;

    let query = Customer.find();
    let totalQueryCount = Customer.find();

    // Sorting
    if (_sort && _order) {
        const sortObject = { [_sort]: _order === "asc" ? 1 : -1 };
        const collation = { locale: 'en', strength: 2 }; // 'en' for English locale, strength: 2 for case-insensitivity

        query = query.sort(sortObject).collation(collation);
    }

    // Pagination
    if (limit && page) {
        query = query.limit(limit).skip((page - 1) * limit);
    }

    try {
        const totalCustomers = await totalQueryCount.countDocuments();
        const customers = await query.exec();

        res.set("X-Total-Count", totalCustomers.toString());

        return res.status(200).json({ success: true, data: customers });
    } catch (error) {
        next(error);
    }
};

const registerCustomer = async (req, res, next) => {
    const { name, username, email } = req.body;
    const profilePicture = req.file ? req.file.filename : null;

    console.log(profilePicture)

    try {
        const customer = await Customer.create({
            name,
            username,
            email,
            profilePicture,
        });

        return res.status(201).json({ success: true, data: customer });
    } catch (error) {
        next(error);
    }
};

const updateCustomer = async (req, res, next) => {
    const { id } = req.params;
    const { name, username, email } = req.body;
    const newProfilePicture = req.file ? req.file.filename : null;

    try {
        const existingCustomer = await Customer.findById(id);

        if (!existingCustomer) {
            deleteImage(req.file.path);
            return next(new ErrorResponse('Customer not found', 404));
        }

        // Check if profile picture exists
        if (existingCustomer.profilePicture && newProfilePicture !== existingCustomer.profilePicture) {
            const filePath = path.join(__dirname, "../", existingCustomer.profilePicture);

            deleteImage(filePath);
        }

        // Update customer data, considering the possibility of a new profile picture
        const updateData = {
            name,
            username,
            email,
        };

        if (newProfilePicture) {
            updateData.profilePicture = "/uploads/" + newProfilePicture;
        }

        const customer = await Customer.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!customer) {
            return next(new ErrorResponse('Customer not found', 404));
        }

        return res.status(200).json({ success: true, data: customer });
    } catch (error) {
        next(error);
    }
};


const deleteCustomer = async (req, res, next) => {
    const { id } = req.params;

    if (!id) {
        return next(new ErrorResponse("Please provide customer id", 400));
    }

    try {
        const customer = await Customer.findOneAndDelete({ _id: id });

        if (!customer) {
            return next(new ErrorResponse("Customer not found", 404));
        }

        if (customer.profilePicture) {
            const filePath = path.join(__dirname, "../", customer.profilePicture);

            deleteImage(filePath)
        }

        return res.status(200).json({ success: true, data: { id: customer.id } });
    } catch (error) {
        next(error);
    }
};



function deleteImage(filePath) {
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }
}


module.exports = {
    getCustomer,
    getCustomers,
    registerCustomer,
    updateCustomer,
    deleteCustomer
}