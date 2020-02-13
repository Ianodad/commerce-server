const express = require('express');
const router = express.Router();

const { Product} = require("../../models/product");
const { User } = require("../../models/user");

const {
    Cart,
    validate
} = require('../../models/cart');


router.get("/", async(req, res) => {
    res.send(await Cart.find())
})

router.get("/:id", async(req, res) => {
    res.send(await Cart.findOne({ userId :req.params.id }))
})



// Get all users
router.post('/:id/newCart', async(req, res) => {
    // const users = await User.find()
    const  { error } = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message);

    let cart = await Cart.findOne({ userId :req.params.id })
    if (!cart) {
        let cart = new Cart ({
            userId: req.params.id,
            state : "active" // three states active , pending , complete
        })
        await cart.save();
        res.status(200).send(cart)
    }

   res.status(200).send(cart)
    

});

router.post("/:id", async (req, res) => {
    let newCart;

    let user = await User.findById( req.params.id);
    if (!user) return res.status(400).send("Invalid customer.");

    let cart = await Cart.findOne({ userId :req.params.id })
    if (!cart) {
        newCart = new Cart ({
            userId: req.params.id,
            state : "active", // three states active , pending , complete
            products: req.body.products,
            createDate : req.body.createDate,
            modifiedDate : req.body.modifiedDate,
            total : req.body.total
        })
         await newCart.save();
    }
    
    cart.products = req.body.products, 
    cart.createDate =  req.body.createDate,
    cart.modifiedDate = req.body.modifiedDate,
    cart.createDate = req.body.total,
    cart.save()


    console.log("it got here")
    
    

    console.log("this is cart" + cart)
    console.log("this is newCart" + newCart)
    res.send(newCart ? newCart : cart)
})

router.post("/:id", (req, res) => {

})


module.exports = router