/**
 * Created by deven on 4/3/2017.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://DevSarda:DevSarda@ds135800.mlab.com:35800/demodatabase';
var z;
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
});
var insertDocument = function(db, data, callback) {
    db.collection('lab10').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the restaurants collection.");
        console.log(result);
        callback();
    });
};
app.get('/signin', function (req, res,next) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        z = req.query.email;
        db.collection('lab10', function (err, collection) {
            collection.findOne({'email': z}, function (err, item) {
                if (err) {
                    res.write("failed to validate");
                    res.end();
                }
                if (item != null) {
                    res.send(item);
                    res.end();
                }

            });
        });

    });
});

app.get('/userDetails',function (req,res,next) {
    MongoClient.connect(url,function (err,db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        db.collection('lab10',function (err,collection) {
            collection.findOne({'email':z},function (err,item) {
                if(err)
                {
                    res.write("failed to fetch");
                    res.end();
                }
                if(item!=null)
                {
                    res.send(item);
                    res.end();
                }

            })
        })
    })
});
app.put('/update', function (req, res) {
    MongoClient.connect(url, function (err, db) {
        if (err) {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        db.collection('lab10').update({'email':z},{$set:{'email':req.body.email,'fname':req.body.fname,'lname':req.body.lname}}, function (err, result) {
            if(err)
            {
                res.write("failed to update");
                res.end();
            }
            if(result!=null)
            {
                z=req.body.email;
                res.send("successfully updated");
                res.end();
            }
            console.log(result);
        })
    })
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})