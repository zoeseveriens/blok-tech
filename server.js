

const express = require('express')
const ejs = require('ejs')

express()
    .use(express.static('static')) //serveer de bestanden die in mijn mapje static staan
    .set('view engine', 'ejs') //express gaat de viewengine ejs vanaf nu gebruiken
    .set('views', 'view')  //al mijn views staan in het mapje view
    .get('/', movies)
    .get('/about', about)
    .get('/404', notFound)
    .listen(8000)

    function movies (req, res) {
        res.status(200).send('server says hello')
    }

    function about(req, res){
        res.status(200).send('about page')
    }

    function notFound(req, res){
        res.status(404).render('not-found.ejs')
    }

