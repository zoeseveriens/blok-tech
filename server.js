

const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
const ejs = require('ejs');
const eslint = require('eslint');
const ejslint = require ('ejs-lint')
const bodyParser = require('body-parser');


//Express server setup
express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .use(bodyParser.urlencoded({extended:true}))
    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view
    .get('/home', home)
    .post('/quotes', post)
    .listen(3000, function() {
      console.log('listening on 3000')
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

    function home (req, res, next) {
      
      db.collection('interests').find().toArray(done)

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


    //Voegt iets toe aan de database
    function post (req, res, next) {

      db.collection('interests').insertOne({
        name : req.body.name,
        quote : req.body.quote
      }, done)

      function done(err, data) {
        if (err) {
          next(err)
        } else {
          console.log(req.body)
          res.redirect('/home')
        }
      }
    }





