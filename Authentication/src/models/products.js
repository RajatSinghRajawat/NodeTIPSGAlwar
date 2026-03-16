const mongoose = require("mongoose");




const productSchema = new mongoose.Schema({
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    inStock: {
        type: Boolean,
        default: true,
    },
}, { timestamps: true });
const product = mongoose.model("Product", productSchema);


module.exports = product;