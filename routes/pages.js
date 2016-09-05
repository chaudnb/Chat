var express = require('express');
var router = express.Router();
//
// /* GET home page. */
// router.get('/home', function (req, res, next) {
//     res.render('pages/home', {title: 'Home Page'});
// });
//
//
// router.get('/chat', function (req, res) {
//     var db = req.db;
//     var messages = [];
//     var mesRef = db.ref('messages').limitToLast(10);
//     mesRef.on('value', function (snapshot) {
//         snapshot.forEach(function(childSnapshot) {
//             var result = childSnapshot.val();
//             messages.push(result);
//         });
//         console.log(messages);
//         res.render('pages/chat', {title: 'Ao Page', "messages" : messages });
//     });
//
// });

// router.get('/about', function (req, res, next) {
//     res.render('pages/login', {title: 'Login Page'});
// });

module.exports = router;