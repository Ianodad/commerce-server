const Joi = require('joi');
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({
    index: Number,
    isAvailable: Boolean,
    image: {
        type: String
    },
    imageLg: {
        type: String,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Category'
    // },

    quantity: {
        type: Number,
        required: true
    },
    rating: {
        type: Number
    },
    description: String,
    registered: {
        type: Date,
        default: Date.now
    }
})

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = {
        image: Joi.string(),
        imageLg: Joi.string(),
        productName: Joi.string().min(3).required(),
        category: Joi.string().required(),
        isAvailable: Joi.boolean(),
        price: Joi.number(),
        quantity: Joi.number(),
        rating: Joi.number(),
        description: Joi.string()
    };

    return Joi.validate(product, schema);
}

module.exports.validate = validateProduct;
module.exports.Product = Product;