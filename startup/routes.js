const express = require('express');


module.exports = function (app) {

    app.use(express.urlencoded({
        extended: false
    }));
   
    // Body Parser
    app.use(express.json());
    // API ROUTING  /////
    // Auth //
    app.use('/api/auth', require('../routes/api/auth/registration'));
    app.use('/api/auth', require('../routes/api/auth/auth'));
    app.use('/api/products',  require('../routes/api/products'))
    app.use('/api/category',  require('../routes/api/categories'))
    app.use('/api/users', require('../routes/api/users'));
    app.use('/api/cart', require('../routes/api/cart'))
    ////    API ROUTING -END   /////
    
    // DASHBOARD //
    app.use('/api/orders', require('../routes/api/orders'))    
}