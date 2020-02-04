const express = require('express');


module.exports = function (app) {

    app.use(express.urlencoded({
        extended: false
    }));
   
    // Body Parser
    app.use(express.json());
    // API ROUTING  /////
    // Auth //
    app.use('/api/auth/registration', require('../routes/api/auth/registration'));
    app.use('/api/users', require('../routes/api/users'));
    /////    API ROUTING -END   /////

}