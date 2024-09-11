const { validateProduct }=require("../validators");
const Product = require("../models/product");


exports.createProduct = async (req, res) => {
    try {
        const { error } = validateProduct(req.body)
        if (error) res.json(error.details[0].message);
        const images = req.files.map(file => ({ img: file.path}))
        const product = new Product({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            images: images,
            price: req.body.price,
            topSelling: req.body.topSelling,
            featured: req.body.featured,
        })

        const new_product_data = await product.save();
        res.json(new_product_data);
    } catch (error) {
        console.log({ message: error.message })
    }
}

exports.getAllProduct = async (req, res) => {
    const products = await Product.find().populate("category")
    res.json(products)
}