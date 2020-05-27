

const express = require('express')
const ejs = require('ejs')
const ejsLint = require('ejs-lint')
const slug = require('slug')
const bodyParser = require('body-parser')


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

express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .use(bodyParser.urlencoded({extended:true}))
    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view
    .get('/foryou', forYou)
    .post('/likes', add)
    .get('/likes', likes)
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

    function likes (req, res){
        res.render('likes.ejs', {data: data})
    }

    function about(req, res){
       res.status(200).send('about page')
    }

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
   }

