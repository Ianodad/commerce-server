const express = require('express');
const router = express.Router();



const {
    Cart,
    validate
} = require('../../models/cart');


// Get all users
router.get('/newCart', (req, res) => {
    // const users = await User.find()
    
    res.send("hello")
});


module.exports = router