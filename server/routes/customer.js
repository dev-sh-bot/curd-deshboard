// customerRoute.js

const express = require("express");
const router = express.Router();
const { getCustomer, getCustomers, registerCustomer, updateCustomer, deleteCustomer } = require("../controllers/customer");
const customerInputValidation = require("../middlewares/customerInputValidation");

router.get("/", getCustomers)
router.get("/:id", getCustomer)
router.post("/",  customerInputValidation, registerCustomer)
router.put("/:id", customerInputValidation, updateCustomer)
router.delete("/:id", deleteCustomer)

module.exports = router;
