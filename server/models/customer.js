const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
        ],
    },
    profilePicture: {
        type: String,
        default: "/uploads/default.png",
    }
}, { timestamps: true });

customerSchema.pre("save", async function(next){
    this.profilePicture = `/uploads/${this.profilePicture}`;
    next();
})

const virtual = customerSchema.virtual("id");

virtual.get(function(){
    return this._id;
})

customerSchema.set("toJSON",{
    virtuals: true,
    versionKey: false,
    transform: function(doc,ret){
        delete ret._id;
        delete ret.createdAt;
        delete ret.updatedAt;
    } 
})


module.exports = mongoose.model("Customer", customerSchema);