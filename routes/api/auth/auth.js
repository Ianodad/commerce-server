const express = require('express');
const router = express.Router();


const { User, validateLogin, decrypt } = require("../../../models/user");


router.post('/login', async (req, res) => {
    const {
        error
    } = validateLogin(req.body);

    if (error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({
        email: req.body.email
    })
    if (!user) return res.status(400).send('Invalid email or password')

    const validPassword = await decrypt(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid password')

    const token = user.generateAuthToken();
    res.send(token)
})

router.post('/logout', async (req, res) => {
    
})

module.exports = router;