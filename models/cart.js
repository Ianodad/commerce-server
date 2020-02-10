// mongoose export
const mongoose = require('mongoose');
const Joi = require('joi');
const {
    productSchema
} = require('./product')

const cartSchema = new mongoose.Schema({
    userId:String,
    state: String,
    products:String,
    Total: Number,
    createDate : Date,
    modifiedDate: Date
})


const Cart = mongoose.model('Cart', cartSchema);

function validateCart(product) {
    const schema = {
         userId:StringJoi.string().required(),
         state : StringJoi.string(),
         Total : NumberJoi.number(), 
         products: Joi.array(),
         createDate : Joi.date().format('YYYY-MM-DD'),
         modifiedDate: Joi.date().format('YYYY-MM-DD')
    };
    return Joi.validate(product, schema);
}

exports.cartSchema = cartSchema;
exports.Cart = Cart;
exports.validate = validateCart;