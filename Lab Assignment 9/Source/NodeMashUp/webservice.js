/**
 * Created by deven on 3/17/2017.
 */
var express = require('express');
var app = express();
var request = require('request');
app.get('/getdata/:food_name', function (req, res) {
    var result={
        'food_details': [],
            };

    request('https://api.nutritionix.com/v1_1/search/'+req.params.food_name+'?fields=item_name%2Citem_id%2Cbrand_name%2Cnf_calories%2Cnf_total_fat&appId=481404ea&appKey=c624ca0b5e85f2f234653dfd8d5fa9c3', function (error,response,body) {
        if (error) {
            return console.log('Error:', error);
        }

        if (response.statusCode !== 200) {
            return console.log('Invalid Status Code Returned:', response.statusCode);
        }
        body = JSON.parse(body);
        var food_values = body.hits;

        request('https://kgsearch.googleapis.com/v1/entities:search?query='+req.params.food_name+'&key=AIzaSyCXJNuYLzvuyRDHgh7zbzPsv071SI555So&limit=1&indent=True', function (error,response,body1) {
            if (error) {
                return console.log('Error:', error);
            }

            if (response.statusCode !== 200) {
                return console.log('Invalid Status Code Returned:', response.statusCode);
            }
            body1 = JSON.parse(body1);
            var fooddescription = body1.itemListElement[0].result;
            result.food_details.push({"food_detail": fooddescription,"food_nutrition":food_values});

            res.contentType('application/json');
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            res.write(JSON.stringify(result));
            res.end();
        });


        /*result.food_details.push(food_values);

        res.contentType('application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.write(JSON.stringify(food_values));
        res.end();*/

    });
    console.log(result);
});


var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example app listening at http://%s:%s", host, port)
});