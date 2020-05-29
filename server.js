

const express = require('express');
const mongo = require('mongodb');
const ejs = require('ejs');
const ejsLint = require('ejs-lint');
const slug = require('slug');
const bodyParser = require('body-parser');

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
    db = client.db(process.env.DB_NAME);
  });


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
    .get('/account', account)
    .get('/edit-account', editAccount)
    .get('/about', about)
    .get('/404', notFound)
    .listen(8000)

    function forYou (req, res){
        res.render('foryou.ejs')
    }

    function add(req, res) {
        console.log(req.body.name);
        var id = slug(req.body.name).toLowerCase()

      
        data.push({
          id: id,
          name: req.body.name,
          age: req.body.age,
          description: req.body.description
        })
      
        res.redirect('/likes')
        
      }

    function addInterests(req, res) {
        console.log(req.body.point);
        var id = slug(req.body.point).toLowerCase()

      
        interests.push({
          id: id,
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

