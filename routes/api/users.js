const express = require('express');
const router = express.Router();
const { User } = require("../../models/user");


// Get all users
router.get('/', async (req, res) => {
    const users = await User.find()

    res.send(users)
});


router.get("/id", async (req, res) => {
    const products = await Product
        .find()
        .populate('category company')
        .sort({
            index: 1
        });

    res.send(products)

})




module.exports = router;