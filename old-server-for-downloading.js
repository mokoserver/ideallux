/**
 * Created by kmalikov on 21.7.17.
 */
const path = require('path');
const fs = require('fs');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const iconv = require("iconv-lite");
const http = require("https");

const options = {
  protocol: 'https:',
  host: 'moko.by',
  method: 'GET',
  port: 8443,
  path: '/restapi/v1.1/catalog/products?offset=2000&perPage=200',
  headers: {
    'Authorization': 'Basic SURFQUxMVVg6SURFQUxMVVg3NDA3NTgy'
  }
};

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/dist'));

app.get('/get', function(req, res) {
  console.log('start!');
  http.get(options, result => {
    result.pipe(iconv.decodeStream("win1251")).collect((err, body) => {
      console.log('body');
      if (err) {
        console.log(err);
        throw err;
      }

      // let array = JSON.parse(fs.readFileSync('products.json'));
      // array = array.concat(JSON.parse(body));
      // fs.writeFileSync('products.json', JSON.stringify(array));
      // const len = JSON.parse(fs.readFileSync('products.json')).length;
      console.log(len)
      res.send({'len':len});
    })
  })
});

// let array = JSON.parse(fs.readFileSync('products.json'));
// array = array.concat(JSON.parse(body));
// fs.writeFileSync('products.json', JSON.stringify(array));
// const len = JSON.parse(fs.readFileSync('products.json')).length;

// For all GET requests, send back index.html
// so that PathLocationStrategy can be used
// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname + '/dist/index.html'));
// });



// Start the app by listening on the default
// Heroku port
app.listen(process.env.PORT || 8080);

console.log('Server is running now on http://localhost:8080');