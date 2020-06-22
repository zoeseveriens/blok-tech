require('dotenv').config();
const express = require('express');
const mongo = require('mongodb');
const ejs = require('ejs');
const ejslint = require('ejs-lint');
const eslint = require('eslint');
const bodyParser = require('body-parser');
const session = require('express-session')
// const port = 5000;

//Express server setup
express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .use(bodyParser.urlencoded({extended:true}))
    .use(session({
      resave: false,
      saveUninitialized: true,
      secret: process.env.SESSION_SECRET
    }))

    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view

    .get('/foryou', forYou)
    .get('/account', account) //lijst met interests
    .get ('/edit-account', getEditProfilePage)
    .get('/404', notFound)

    .post('/account', updateProfile)

    .listen(5000, function() {
      console.log('listening on 5000') 
    })

//Connecting with database
require('dotenv').config();

const url = 'mongodb+srv://' + process.env.DB_NAME + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
let db;

mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
    if (err) {
      throw err;
    } else {
      console.log('Database is connected');
    }
    db = client.db('profile-interests');
  });
  


https://zellwk.com/blog/crud-express-mongodb/

//Dit is je account pagina
function account (req, res, next) {
  
  db.collection('users').find().toArray(done)

  function done(err, data) {
    if (err) {
      next (err)
    } else {
      res.render('account.ejs', {data: data})

    }
  }
}


//voegt profiel info toe aan de database

function updateProfile (req, res, next) {

  db.collection('users').insertOne({
    name: req.body.name,
    age: req.body.age,
    profession: req.body.profession,
    about: req.body.about,
    interest : req.body.interest
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      console.log(req.body)
      res.redirect('/account')
    }
  }
}

//Dit is de edit account pagina
function getEditProfilePage (req, res) {
  res.render('edit-account.ejs')
}


    function forYou (req, res){
        res.render('foryou.ejs')
    };

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

