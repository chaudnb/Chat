var firebase = require('firebase');

var config = {
    apiKey: "AIzaSyBgLcRAIXVuM6ZzOuNeicKWtZZi6h6fgy0",
    authDomain: "mychat2-bf778.firebaseapp.com",
    databaseURL: "https://mychat2-bf778.firebaseio.com",
    storageBucket: "mychat2-bf778.appspot.com"
};

firebase.initializeApp(config);
var db = firebase.database();
module.exports(db);