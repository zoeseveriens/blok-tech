const express = require('express');
const mongo = require('mongodb');
const ejs = require('ejs');
const ejslint = require('ejs-lint');
const eslint = require('eslint');
const bodyParser = require('body-parser');
const session = require('express-session')
require('dotenv').config();

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
    .get('/edit-account', getEditProfilePage)
    .get('/account', getAccount)
    .get('/404', notFound)

    .post('/edit-account', addDataProfile)

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

//Dit is je edit account pagina
function getEditProfilePage (req, res, next) {
  
  db.collection('users').find().toArray(done)

  function done(err, data) {
    if (err) {
      next (err)
    } else {
      res.render('edit-account.ejs', {data: data})

    }
  }
}

function getAccount (req, res){
  res.status(200).render('account.ejs')
}

//voegt profiel info toe aan de database

function addDataProfile (req, res, next) {

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
      res.redirect('/edit-account')
    }
  }
}


    function forYou (req, res){
        res.render('foryou.ejs')
    };

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

