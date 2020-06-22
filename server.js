require('dotenv').config();
const express = require('express');
const mongo = require('mongodb');
const ejs = require('ejs');
const ejslint = require('ejs-lint');
const bodyParser = require('body-parser');
const session = require('express-session')
const port = 4000;

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

    .get('/foryou', forYou) //Dit is de match page (home)
    .get('/404', notFound) //Error pagina
    .get('/create-profile', getCreateProfilePage) //hier maak je een nieuw account aan
    .get('/update-profile', getUpdateProfilePage) //hier kun je meteen je profiel aanpassen als je wil
    .get('/profile-result', getProfileResult) //hier zie je hoe het profiel er uit ziet

    .post('/create-profile', addDataProfile)
    .post('/update-profile', updateDataProfile)
    .post('/profile-result', deleteProfile)
    .listen(process.env.PORT || 4000, () => console.log(`app draait op port ${port}!!`));

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
  

  //rendert de begin pagina
  function getCreateProfilePage (req, res) {
    res.render('create-profile.ejs')
  }

//https://zellwk.com/blog/crud-express-mongodb/

//voegt profiel info toe aan de database
function addDataProfile (req, res, next) {
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
      res.redirect('/update-profile');
    }
  }
}

//https://github.com/cmda-bt/be-course-19-20/blob/master/examples/mongodb-server/index.js
// Hulp gekregen van een klasgenoot
async function getUpdateProfilePage (req, res) {
  var id = req.session.user._id
  let user = await db.collection('users').findOne({_id: mongo.ObjectID(id)}); //zonder await blijft de id steeds op pending staan
  console.log(user.name)
  console.log(user)
  res.render('update-profile.ejs',{user})
}


// Hulp gekregen van een klasgenoot
 async function getProfileResult(req, res) {
  if (req.session.user){
    res.render('profile-result', {user: await db.collection('users').findOne({_id: mongo.ObjectID(req.session.user._id)})});
  } else {
    res.redirect('/404') //als je geen profiel hebt krijg je een error page
  }
}

// function deleteProfile(req, res) {
// 	res.status(200).send('This will be the delete page');
// }

// https://docs.google.com/presentation/d/1J0SVcx7rMnFp37JqsQMHQq92EfBRUFdgSAj5i9wQKjg/edit#slide=id.g33c7310eb9_0_676
// https://docs.google.com/presentation/d/1J0SVcx7rMnFp37JqsQMHQq92EfBRUFdgSAj5i9wQKjg/edit#slide=id.g33c7310eb9_0_401
function deleteProfile(req, res, next){
  db.collection('users').deleteOne({
		_id: mongo.ObjectID(req.session.user._id)
	}, done);

	function done(err, data) {
		if (err) {
			next(err);
		} else {
      console.log('session is destroyed');
      req.session.destroy();
			res.redirect('/create-profile');
		}
	}
}

// https://docs.google.com/presentation/d/1J0SVcx7rMnFp37JqsQMHQq92EfBRUFdgSAj5i9wQKjg/edit#slide=id.g33c7310eb9_0_389
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
    }

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

