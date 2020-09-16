//Install express server
const express = require('express');
const path = require('path');
require('dotenv').config();
var nodemailer = require('nodemailer');

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

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: process.env.EMAIL_PORT
});

console.log("ENV ", process.env.EMAIL_USER, process.env.EMAIL_PASS, process.env.EMAIL_PORT)


app.post('/send', (req, res, next) => {
  console.log("EMAIL POST");
  const mailOptions = {
    from: 'sender@email.com', // sender address
    to: 'ericnewton2251@gmail.com', // list of receivers
    subject: 'Subject of your email', // Subject line
    html: '<p>Your html here</p>'// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err)
      console.log(err)
    else
      console.log(info);
  });


})
console.log("Production: " + process.env.PRODUCTION);

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
