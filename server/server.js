const path = require('path');
const publickPath = path.join(__dirname + '/../public/');

const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(publickPath));


app.listen(port, ()=> {
    console.log('The server is running on port ' + port);
});
