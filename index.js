const express = require('express');
const app = express();



require("./startup/cors")(app);
require('./startup/config')();
require('express-async-errors')
// routing separation of concern
require('./startup/routes')(app);
require('./startup/db')();


// creating a port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));