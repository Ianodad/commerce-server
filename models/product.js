const Joi = require('joi');
const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({

    index: Number,
    isAvailable: Boolean,
    image: {
        type: String
    },
    imageLg: {
        type: String
    },
    category: {
        type: String
    },
    // category: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: 'Category'
    // },
    productName: {
        type: String
    },
    price:{ 
        type:Number,
        require: true
    },
    subTotal: Number,
    quantity: {
        type: Number
    },
    rating: {
        type: Number
    },
    description: String,
    registered: {
        type: Date,
        default: Date.now()
    }
})

const Product = mongoose.model('Product', productSchema);

function validateProduct(product) {
    const schema = {
        image: Joi.string(),
        imageLg: Joi.string(),
        productName: Joi.string().min(3),
        category: Joi.string(),
        isAvailable: Joi.boolean(),
        price: Joi.number(),
        quantity: Joi.number(),
        rating: Joi.number(),
        description: Joi.string()
    };

    return Joi.validate(product, schema);
}

// validateProductChart(product) {


// }

module.exports.validate = validateProduct;
module.exports.Product = Product;
module.exports.productSchema= productSchema;