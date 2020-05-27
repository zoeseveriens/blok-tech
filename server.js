

const express = require('express')
const ejs = require('ejs')
const ejsLint = require('ejs-lint')
const slug = require('slug')
const bodyParser = require('body-parser')

const matchesData = [
    {
        id: 'shane',
        img: 'no img',
        name: 'Shane',
        age: '24',
        description:'Love to travel',
    },
    {
        id: 'chicky-nuggies',
        img: 'no img',
        name: 'Chicky Nuggies',
        age: '1',
        description:'Baby Yoda trying to say vegetables',
    }
]

express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .use(bodyParser.urlencoded({extended:true}))
    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view
    .get('/', forYou)
    .get('/likes', likes)
    .get('/about', about)
    .get('/404', notFound)
    .listen(7000)

    function forYou (req, res) {
        res.status(200).render('static/index.html')
    }

    function likes (req, res){
        res.render('likes.ejs', {data: matchesData})
    }

    function about(req, res){
       res.status(200).send('about page')
    }

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

