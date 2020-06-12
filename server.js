const express = require('express');
const mongo = require('mongodb');
const mongoose = require('mongoose');
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
    .get('/account', getAccount) //Dit is jouw account pagina
    .get ('/account', getAboutInfo)
    .get ('/edit-interests', getEditAccount) //Hier zie je de lijst met interests

    .post('/interests', addInterests)// voegt interest toe op de edit page vanaf edit page
    // .post('/account', addAboutInfo) //voegt info toe op account page vanaf edit page

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

//laat de interests zien op je profielpagina die je net hebt toegevoegt of verwijderd
function getAccount (req, res, next) {
  
  db.collection('about').find().toArray(done)

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

//laat meteen de interests zien die op je profiel staan wanneer je ze aan het toevoegen of verwijderen bent
function getEditAccount (req, res, next) {
  
  db.collection('interests-list').find().toArray(done)

  function done(err, data) {
    if (err) {
      next (err)
    } else {
      res.render('edit-account.ejs', {
        data: data
      })

    }
  }
}

//laat de about info die is opgeslagen vanaf de edit page zien op de account page
function getAboutInfo (req, res, next) {
  
  db.collection('about').find().toArray(done)

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

//voegt about info toe aan de database vanaf de edit page
// function addAboutInfo (req, res, next) {

//   db.collection('about').insertOne({ s
//     about : req.body.about
//   }, done)

//   function done(err, data) {
//     if (err) {
//       next(err)
//     } else {
//       console.log(req.body)
//       res.redirect('/account')
//     }
//   }
// }


//Voegt een interest toe aan de database op de edit profile page
function addInterests (req, res, next) {

  db.collection('interests-list').insertOne({
    interest : req.body.interest
  }, done)

  function done(err, data) {
    if (err) {
      next(err)
    } else {
      console.log(req.body)
      res.redirect('/edit-interests')
    }
  }
}



    function forYou (req, res){
        res.render('foryou.ejs')
    };



