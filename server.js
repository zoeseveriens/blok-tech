const express = require('express');
const mongo = require('mongodb');
// const mongoose = require('mongoose');
const ejs = require('ejs');
const ejslint = require('ejs-lint');
const eslint = require('eslint');
const bodyParser = require('body-parser');

//Express server setup
express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .use(bodyParser.urlencoded({extended:true}))

    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view

    .get('/foryou', forYou)
    .get('/likes', likes)
    .get('/account', account) //lijst met interests
    .get ('/edit-account', getEditProfilePage)
    .get('/404', notFound)

    .post('/likes', add)
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
  
//Connecting database with mongoose
// require('dotenv').config(); //haalt de gevoelige data uit mijn .env file 

// const url = 'mongodb+srv://' + process.env.DB_NAME + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
// const db = process.env.DB_NAME;

// mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) =>{
//       if (err) {
//       throw err;
//     } else {
//       console.log('Database is connected');
//     }
  
// });


https://zellwk.com/blog/crud-express-mongodb/

//Dit is je account pagina
function account (req, res, next) {
  
  db.collection('users').find().toArray(done)

  function done(err, data) {
    if (err) {
      next (err)
    } else {
      res.render('account.ejs', {
        data: data
      })

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

    function forYou (req, res){
        res.render('foryou.ejs')
    };




//Data in the server
const data = [
    {
        id: 'shane',
        name: 'Shane',
        age: '24',
        description:'Love to travel',
    },
    {
        id: 'daniel',
        name: 'Daniel',
        age: '22',
        description:'...',
    }

]

//Lege array waar de interest komt die de user invult
const interests = []

//Dit is de edit account pagina
function getEditProfilePage (req, res) {
  res.render('edit-account.ejs')
}


    function forYou (req, res){
        res.render('foryou.ejs')
    };

    //code van de college les
    function add(req, res) {
        console.log(req.body.name);

      
        data.push({
          name: req.body.name,
          age: req.body.age,
          description: req.body.description
        })
      
        res.redirect('/likes')
        
      }

    function likes (req, res){
        res.render('likes.ejs', {data: data})
    }


    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

