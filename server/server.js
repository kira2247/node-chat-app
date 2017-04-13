const path = require('path');
const express = require('express');

//setup public path
const publicPath = path.join(__dirname,'../public');

//setup port for server
const port = process.env.PORT || 3000;
let app = express();

//setup express static middleware to public folder
app.use(express.static(publicPath));

app.listen(port,()=>{
  console.log(`Server is up on port ${port}`);
});
