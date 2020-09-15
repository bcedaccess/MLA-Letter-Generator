//Install express server
const express = require('express');
const path = require('path');
require('dotenv').config();

const app = express();
if(!process.env.PRODUCTION){
  app.use(express.static('./src/'))

  app.get('./*', function(req,res) {
    res.sendFile(path.join('src/index.html'));
  });
} else{
  app.use(express.static(__dirname + '/dist/MLA-Letter-Generator'));
  app.get('./*', function(req,res) {

    res.sendFile(path.join(__dirname+'/dist/MLA-Letter-Generator/index.html'));

  });
}


app.post('/send', (req, res, next) => {
  console.log("EMAIL POST");

})
console.log("Production: " + process.env.PRODUCTION);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
