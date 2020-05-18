

var express = require('express')

express()
    .use(express.static('static'))
    .get('/', movies)
    .get('/about', about)
    .listen(8000)

    function movies (req, res) {
        res.status(200).send('server says hello')
    }

    function about(req, res){
        res.status(200).send('about page')
    }

