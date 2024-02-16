const mongoose = require("mongoose");

const URI = process.env.DB_URI_PRODUCTION || process.env.DB_URI_LOCAL;

mongoose.connect(URI);

mongoose.connection.on("connected", () => {
    console.log("DB Connected")
})

mongoose.connection.on("error", (err) => {
    console.log("Error while connecting error ", err)
})