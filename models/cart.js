// mongoose export
const mongoose = require('mongoose');
const BaseJoi = require('joi');
const Extension = require('joi-date-extensions');
const Joi = BaseJoi.extend(Extension);
const {
    productSchema
} = require('./product')

 
const cartSchema = new mongoose.Schema({
    userId:{
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
    state: String,
    products:[productSchema],
    orderSubTotal: Number,
    shippingCost: Number, 
    tax: Number,
    total: Number,
    createDate : Date,
    modifiedDate: Date
})


const Cart = mongoose.model('Cart', cartSchema);

function validateCart(product) {
    const schema = {
         userId:Joi.string(),
         state : Joi.string(),
         orderSubTotal: Joi.number(),
         shippingCost: Joi.number(),
         tax: Joi.number(),
         total : Joi.number(), 
         products: Joi.array(),
         createDate : Joi.date().format('YYYY-MM-DD'),
         modifiedDate: Joi.date().format('YYYY-MM-DD')
    };
    return Joi.validate(product, schema);
}

exports.cartSchema = cartSchema;
exports.Cart = Cart;
exports.validate = validateCart;