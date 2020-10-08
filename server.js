//Install express server
const express = require('express');
const path = require('path');
require('dotenv').config();
const nodemailer = require('nodemailer');
const csv = require('csv-parser')
const fs = require('fs')


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
app.use(express.json());

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  port: process.env.EMAIL_PORT
});

app.get('/reps/:dist', (req, res) => {
  district = req.params.dist.replace(":", "")
  console.log("DISTUCT", district)
  rv = []
  mlas.forEach(m => {
    if(m.district === district && m.email){
      rv.push(m)
    }
  })
  res.status(200);
  res.json(rv)

});

app.post('/sendall', (req, res) => {
  const data = req.body;
  let totalLetters = '';

  data.forEach(m => {
    const mailOptions = {
      from: m.email, // sender address
      to: m.mp.email, // list of receivers
      subject: 'Action Required: Education Assistants need Standards of Practice', // Subject line
      text: m.letterData// plain text body
    };
    totalLetters += m.letterData + '\n\n\n\n\n'
    transporter.sendMail(mailOptions, function (err, info) {
    });
  })



  mailOptions = {
    from: 'letters@bcedaccess.com', // sender address
    to: data[0].email, // list of receivers
    subject: 'Copy of: Action Required: Education Assistants need Standards of Practice', // Subject line
    text: totalLetters// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if (err) {
      res.status(400);
      res.error();
    } else {
      res.status(200);
      res.json(info);
    }
  });

})


app.post('/send', (req, res) => {

  const data = req.body;
  if(!data.mp.email){
    //MP has no email on record.
  }

  const mailOptions = {
    from: data.email, // sender address
    to: data.mp.email, // list of receivers
    cc: 'letters@bcedaccess.com',
    subject: 'Action Required: Education Assistants need Standards of Practice', // Subject line
    text: data.letterData// plain text body
  };
  transporter.sendMail(mailOptions, function (err, info) {
    if(err) {
      res.status(400);
      res.error();
    }
    else {
      res.status(200);
      res.json(info);
    }
  });


})
console.log("Production: " + process.env.PRODUCTION);

class MLA {
  district;
  name;
  email;
  party_name;

  constructor(district, name, email, party) {
    this.district = district;
    this.name = name;
    this.email = email;
    this.party_name = party;
  }
}

const mlas = []

fs.createReadStream('data/Candidate-Emails.csv')
  .pipe(csv())
  .on('data', row => {
    m = new MLA(row['Electoral District'], row['Candidate Ballot Name'], row['Email'], row['Affiliation'])
    mlas.push(m)
  }).on('end', () => {
    console.log("file finished")
  console.log(mlas)
});



// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
