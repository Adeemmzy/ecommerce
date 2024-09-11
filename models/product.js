const { string } = require('joi')
const mongoose = require('mongoose');



const productSchema = new mongoose.Schema({
    category: {type: mongoose.Types.ObjectId, ref: "Category", required: true},
    name: {type: String, require: true},
    price: {type: Number, require: true},
    images: [{ img: { type: String, required: true}}],
    description: {type: String, require: true},
    featured: {type: Boolean, default: false},
    topSelling: {type: Boolean, default: false},
}, {timestamps: true})


module.exports = mongoose.model("Product", productSchema);