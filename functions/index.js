const functions = require('firebase-functions');
const express = require('express');
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
//sudo firebase deploy --only functions
// http://localhost:5000/rentoserver/us-central1/app/
// https://firebase.google.com/docs/functions/local-emulator
const app = express(); 

var data = [];

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/add', (req, res) => {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');

    console.log(req.query);
    switch (req.query.type) {
        case "good": data.push({ type: 'good', content: req.query.content,key: req.query.key }); break;
        case "bad": data.push({ type: 'bad', content: req.query.content, key: req.query.key}); break;
        case "happiness": data.push({ type: 'happiness', content: req.query.content ,key: req.query.key }); break;
    }
    res.send('Added');
});

app.get('/getAll', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');

    res.send(JSON.stringify(data));
});

app.get('/resetAll',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
    data = [];
    
    res.send('Reset done');
});

app.get('/delete',(req,res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept');
        console.log(req.query);
        switch (req.query.type) {
            case "good": deleteFrom(data, req.query.key); break;
            case "bad":  deleteFrom(data, req.query.key); break;
            case "happiness":  deleteFrom(data, req.query.key); break;
        }
     
    res.send('stiky deleted');
}); 
 
  function deleteFrom(group, key){
    let index = 0, count = 1;
    group.forEach(element => {
      if(element.key === key){
        index = count;
      }
      count++;
    });
    group.splice(index, 1);
  }
 

exports.app =  functions.https.onRequest(app); 