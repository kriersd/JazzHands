var express = require('express');
var router = express.Router();
var request = require('request');

//the stringdata for the api calls
var sanFran= 'lat1=37.757815&lon1=-122.5076401&lat2=37.7749211&lon2=-122.4194527';
var chicago=  'lat1=41.8339037&lon1=-87.8720481&lat2=41.8781136&lon2=-87.6297982';
var newYork= 'lat1=40.6975007&lon1=-74.1197758&lat2=40.7127753&lon2=-74.0059728';

//datatopass to the html
var dataToPass = {"sf":{}, "chi":{}, "ny":{}, "bcPrice":""};
var venueUrl = 'https://coinmap.org/api/v1/venues/?';
//get venues from coinmap
var stringData = "";
/*
var getCall = (url, stringData) => {
  request.get({ uri: url + stringData }, function (error, response, body) {
    if (!(error && response.statusCode !== 200)) {
      //parse into json object and then get only the NY venues
      return body;
    } else {
      console.log('Error when getting the venues for NY')
    }
  });
}*/

/* GET home page. */
router.get('/', function(req, res, next) {
  

  //set up the api call for sf
  stringData = sanFran;
  request.get({ uri: venueUrl + stringData }, function (error, response, body) {
    if (!(error && response.statusCode !== 200)) {
      //parse into json object and then get only the sf venues
      dataToPass.sf = JSON.parse(body).venues;

      //set up the api call for chi
      stringData = chicago;
      request.get({ uri: venueUrl + stringData }, function (error, response, body) {
        if (!(error && response.statusCode !== 200)) {
          //parse into json object and then get only the chicago venues
          dataToPass.chi = JSON.parse(body).venues;

          //set up the api call for ny
          stringData = newYork;
          request.get({ uri: venueUrl + stringData }, function (error, response, body) {
            if (!(error && response.statusCode !== 200)) {
              //parse into json object and then get only the NY venues
              dataToPass.ny = JSON.parse(body).venues;
              
              request.get({ uri: 'https://api.coindesk.com/v1/bpi/currentprice.json' }, function (error, response, body) {
                if (!(error && response.statusCode !== 200)) {
                  //parse into json object and then get only the NY venues
                  dataToPass.bcPrice = JSON.parse(body).bpi.USD.rate;
                  //pass the venues object using handlebar into the client html page,
                  //and create the html page
                  res.render('index', {data: dataToPass, envplatform: process.env.envplatform});
                } else {
                  console.log('Error when getting the venues for NY')
                }
              });
            } else {
              console.log('Error when getting the venues for NY')
            }
          });
        } else {
          console.log('Error when getting the venues for Chicago')
        }
     });
    } else {
      console.log('Error when getting the venues for San Francisco')
    }
  }); 
});


module.exports = router;