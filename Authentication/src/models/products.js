const mongoose = requrie("mongoose");




const productSchema = new mongoose.Schema({
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