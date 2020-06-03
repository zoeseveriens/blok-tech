

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const ejs = require('ejs');
const eslint = require('eslint');
const bodyParser = require('body-parser');

//Connecting with database
// require('dotenv').config();

// const url = 'mongodb+srv://' + process.env.DB_NAME + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
// let db;

// mongo.MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, client) => {
//     if (err) {
//       throw err;
//     } else {
//       console.log('Database is connected');
//     }
//     db = client.db(process.env.DB_NAME);
//   });
  
//Connecting database with mongoose
require('dotenv').config(); //haalt de gevoelige data uit mijn .env file 

const url = 'mongodb+srv://' + process.env.DB_NAME + ':' + process.env.DB_PASS + '@' + process.env.DB_HOST;
const db = process.env.DB_NAME;

mongoose.connect(url , {useNewUrlParser: true, useUnifiedTopology: true}, (err, client) =>{
      if (err) {
      throw err;
    } else {
      console.log('Database is connected');
    }
  
});

// Require model
const your_profile = require("./model/your_profile.js");


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

//Express server setup
express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .use(bodyParser.urlencoded({extended:true}))
    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view
    .get('/foryou', forYou)
    .post('/likes', add)
    .post('/account', addInterests)
    .get('/likes', likes)
    .get('/account', account) //lijst met interests
    .get('/edit-account', editAccount)
    .get('/about', about)
    .get('/404', notFound)
    .listen(8000)

    function forYou (req, res){
        res.render('foryou.ejs')
    };

//haalt data uit de server (werkt niet)
//     function editAccount (req, res, next){
//       db.collection('userinterests').insertOne({
//         interests: req.body.point,
//       }, done)


//     function done (err, data) {
//       if (err){
//         next (err)
//       } else {
//         res.redirect('/account')
//       }
//     }
//     }

//     function account (req, res, next) {
//       db.collection('userinterests').find()toArray(done)

//       function done(err, data){
//         if (err){
//           next (err)
//         } else {
//           res.render('account.ejs', {data: data})
//         }
//       }
//     }
// //



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

    function addInterests(req, res) {
        console.log(req.body.point);

      
        interests.push({
          point: req.body.point
        })
      
        res.redirect('/account')
        
      }

    function likes (req, res){
        res.render('likes.ejs', {data: data})
    }

     function account (req, res){
         res.render('account.ejs', {data: interests})
    }

    function editAccount (req, res){
        res.render('edit-account.ejs')
    }

    function about(req, res){
       res.status(200).send('about page')
    }

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

