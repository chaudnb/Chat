var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
// router.get('/helloworld', function(req, res) {
//   res.render('helloworld', { title: 'Hello, World!' });
// });
// router.get('/home', function(req, res) {
//   var db = req.db;
//   var messages = [];
//   var mesRef = db.ref('messages').limitToLast(10);
//   mesRef.on('value', function (snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var result = childSnapshot.val();
//       messages.push(result);
//     });
//     console.log(messages);
//     //res.render('home', { title: 'Test', "messages" : messages });
//     res.json(messages);
//   });
// });
//
// router.get('/api', function(req, res) {
//   var ref = req.ref;
//   res.send(ref);
// });
//
// /* POST to Add message */
// router.post('/addmesg', function(req, res) {
//
//   // Set our internal DB variable
//   var db = req.db;
//
//   // Get our form values. These rely on the "name" attributes
//   var mesg = {
//     from: "test",
//     content: req.body.messagw
//   };
//
//   // Set our collection
//   var mesRef = db.ref('messages');
//   mesRef.push(mesg);
//   //res.redirect("messages");
// });
// router.get('/addmesg', function(req, res) {
//   var db = req.db;
//   var messages = [];
//   var mesRef = db.ref('messages').limitToLast(10);
//   mesRef.on('value', function (snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//       var result = childSnapshot.val();
//       messages.push(result);
//     });
//     console.log(messages);
//     res.render('chat', { title: 'Test', "messages" : messages });
//   });
// });
//
// router.get('/home', function(req, res) {
//   res.render('pages/home', { title: 'Home' });
// });
// router.get('/login', function(req, res) {
//   res.render('pages/login', { title: 'Home' });
// });
// router.get('/ao', function(req, res) {
//   res.render('pages/ao', { title: 'Home' });
// });
module.exports = router;
