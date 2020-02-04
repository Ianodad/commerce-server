const express = require('express');
const router = express.Router();


// Get all users
router.get('/', (req, res) => {
    // const users = await User.find()
   
    res.send("hello")
});


module.exports = router;