var config = {
    apiKey: "AIzaSyBgLcRAIXVuM6ZzOuNeicKWtZZi6h6fgy0",
    authDomain: "mychat2-bf778.firebaseapp.com",
    databaseURL: "https://mychat2-bf778.firebaseio.com",
    storageBucket: "mychat2-bf778.appspot.com"
};
firebase.initializeApp(config);
var db = firebase.database();
angular
    .module('myApp')
    .factory("ChatMessages", ["$firebaseArray", function ($firebaseArray) {

        var ref = db.ref('messages').limitToLast(10);
        var allMessages = $firebaseArray(ref);
        return {
            all: allMessages,
            create: function (message) {
                return allMessages.$add(message);
        }
    }
}
]);

// app.factory("CurrentOnline", ["$firebaseArray", function ($firebaseArray) {
//     var ref = firebase.database().ref('online');
//     var allUsers = $firebaseArray(ref);
//     return {
//         all: allUsers,
//         create: function (curUser) {
//             return allMessages.$add(curUser);
//         },
//         delUser: function (curUser) {
//             return allMessages.$remove(curUser);
//         }
//     }
// }
// ]);


