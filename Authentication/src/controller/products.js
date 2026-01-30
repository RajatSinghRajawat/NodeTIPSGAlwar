const product = require("../models/products")

const addPrdoucts = async (req, res) => {
    try {
        const { name, price, description, inStock } = req.body
        const add = await product.create({
            name, price, description, inStock
        })
        res.status(200).json({ message: "product addded successfully", add })
    } catch (error) {
        console.log(error);

    }
}

const getproducts = async (req, res) => {
    try {
        const get = await product.find({});
        res.status(200).json({ message: "product addded successfully", get })


    } catch (error) {
        console.log(error);

    }
}


const getOne = async (req, res) => {
    try {
        const id = req.params.id
        const get = await product.findById(id);
        res.status(200).json({ message: "product fetched successfully", get })
    } catch (error) {
        res.status(500).json({ message: "Error fetching product", error })
    }
}

const searchProducts = async (req, res) => {
    try {
        const {query} = req.query;
        const results  = await product.find({ name: { $regex: query, $options: 'i' } });
        res.status(200).json({ message: "Search results", results })
    } catch (error) {
        
    }
}

module.exports = { addPrdoucts, getproducts, getOne , searchProducts}