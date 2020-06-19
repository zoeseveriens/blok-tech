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
    .get('/404', notFound)

    .get('/edit-account', getEditProfilePage) //hier begin je
    .get('/account', getAccount) //vanaf hier kun je updaten eventueel
    .get('/profile-result', getProfileResult) //hier zie je je resultaat

    .post('/edit-account', addDataProfile)
    .post('/account', updateDataProfile)
    .post('/profile-result', deleteProfile)

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

//voegt profiel info toe aan de database

function addDataProfile (req, res) {
  req.session.user = {
    name: req.body.name,
    age: req.body.age,
    profession: req.body.profession,
    about: req.body.about,
    interest : req.body.interest
  };

  db.collection('users').insertOne(req.session.user, done);
  function done(err, data){
    if(err){
      next(err);
    } else {
      // console.log(req.session.user)
      // console.log(req.session)
      res.redirect('/account');
    }
  }
}

async function getAccount (req, res) {

  let user = await db.collection('users').findOne({'_id': mongo.ObjectID(req.session.user._id)});
  console.log(user.name)
  console.log(user)
  res.render('account.ejs',{user})
}


function getEditProfilePage (req, res) {
  res.render('edit-account.ejs')
}

async function getProfileResult(req, res) {

	res.render('profile-result', {user: await db.collection('users').findOne({'_id': mongo.ObjectID(req.session.user._id)})});
}

function deleteProfile(req, res) {
	res.status(200).send('This will be the delete page');
}

function updateDataProfile(req, res, next) {
	db.collection('users').updateOne({
		_id: mongo.ObjectID(req.session.user._id)},
	{$set: 
			{ name: req.body.name,
        age: req.body.age,
        profession: req.body.profession,
        about: req.body.about,
        interest : req.body.interest}
	}
	, done);

	function done(err, data) {
		if (err) {
			next(err);
		} else {
      console.log(req.session.user)
			res.redirect('/profile-result');
		}
	}
}

    function forYou (req, res){
      if(req.session.user){
        res.render('foryou.ejs')
      } else{
        res.redirect('/404')
      }  
    };

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

