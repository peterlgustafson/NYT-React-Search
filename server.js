// Dependencies
var express = require("express");
var mongojs = require("mongojs");
var logger = require("morgan");
var bodyParser = require('body-parser');

var PORT = process.env.PORT || 3001;
var app = express();

// Set the app up with morgan
app.use(logger("dev"));

// set the app up with bodyparser
app.use(bodyParser());

// Database configuration
var databaseUrl = process.env.MONGODB_URI || "nytreact_db";
var collections = ["articles"];

// Hook mongojs config to db variable
var db = mongojs(databaseUrl, collections);

// Log any mongojs errors to console
db.on("error", function (error) {
    console.log("Database Error:", error);
});

//Routes

//Route to get all articles

app.get('/api/articles', function (req, res) {
    // res.send('hi');
    db.articles.find({
        "_id": mongojs.ObjectID(req.params.id)
    }, function (error, result) {
        res.json(result);
    });
});

//Route for search
// app.get('/api/articles/:q/:begin_date/q:end_date/', function (req, res) {
//     var ob = {
//         'api-key': "0eafe269423a4ff88b474ef6d3ceea7e",
//         'page': "0",
//         'q': req.params.q,
//         'begin_date': req.params.begin_date,
//     }

//     if (req.params.end_date != 0) {
//         ob.end_date = req.params.end_date;
//     }

//     request.get({
//         url: "https://api.nytimes.com/svc/search/v2/articlesearch.json",
//         qs: ob,
//         headers: {
//             'Accept': 'application/json',
//             'Origin': '*',
//             'Content-Type': 'application/json'
//         },
//     }, function (err, response, body) {
//         body = JSON.parse(body);
//         res.json(body);
//     })
// })


//Route to post article
app.post('/api/articles', function (req, res) {
    console.log(req.body);
    db.articles.insert(req.body, function (error, savedArticle) {
        // Log any errors
        if (error) {
            res.send(error);
        } else {
            res.json(savedArticle);
        }
    });
});

//Route to delete article from a database
app.delete('/api/articles/:id', function (req, res) {

    var article_id = req.params.id;

    db.articles.remove({
        "_id": mongojs.ObjectID(article_id)
    }, function (error, removed) {
        if (error) {
            res.send(error);
        } else {
            res.json(article_id);
        }
    });
});

//De-facto catch all route
//   app.get('*', function(req, res){
//     res.sendFile(__dirname + './client/build/index.html');

// Listen on port 3001
app.listen(PORT, function () {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
});