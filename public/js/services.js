angular
    .module('myApp')
    .factory("ChatMessages", ["$firebaseArray", function ($firebaseArray,req) {
        var db = req.db;
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
//
// app.factory("Auth", ["$firebaseAuth",
//     function($firebaseAuth) {
//         var ref = firebase.database();
//         return $firebaseAuth(ref);
//     }
// ]);
//
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

//
// angular
//     .module('statusApp')
//     .factory('Auth', AuthService);
//
// function AuthService($firebaseAuth) {
//     var ref = new Firebase("https://statusapp.firebaseio.com");
//     return $firebaseAuth(ref);
// }
//
// })();
