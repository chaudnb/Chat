
var fbconfig = {
    apiKey: "AIzaSyBgLcRAIXVuM6ZzOuNeicKWtZZi6h6fgy0",
    authDomain: "mychat2-bf778.firebaseapp.com",
    databaseURL: "https://mychat2-bf778.firebaseio.com",
    storageBucket: "mychat2-bf778.appspot.com"
};
firebase.initializeApp(fbconfig);

var db = firebase.database();
// Controller Functions
function MainController($scope) {
    $scope.$on('load', function () {
        $scope.loading = true;
    });

    $scope.$on('unload', function () {
        $scope.loading = false;
    })

}

function HomeController($scope,ChatMessages,$cookies) {
    var cookieWObject = $cookies.getObject('cookieName');
    if(cookieWObject == null){
        var obj = {
            currentUser: {
                username: "Guest" + Math.round(Math.random() * 10000)
            }
        };
        $cookies.putObject('cookieName', obj);
    }
    $scope.user = cookieWObject.currentUser;

    // $scope.messages = [];
    // $http.get('/home').then(
    //     function(response){
    //         $scope.messages = response.data;
    //     },
    //     function(err){
    //         console.error(err);
    //     });

    $scope.messages = ChatMessages.all;
    //
    $scope.addMessage = function (message) {

        message = {
            uid:$scope.user.username,
            from: "Guest",
            content: $scope.message,
            createdDate: new Date().getTime()
        };
        ChatMessages.create(message);

        $scope.message = "";
    };

    $scope.test = "testing";
}

function LoginController($scope,$state,OnlineUsers ) {

    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            $state.go('ao');
        } else {
            $state.go('login');
        }
    });


    $scope.email = "";
    $scope.password = "";

    $scope.loginAo = function (email,password) {

        email = $scope.email;
        password = $scope.password;

        if (email.length < 4) {
            alert('Please enter an email address.');
            return;
        }
        if (password.length < 4) {
            alert('Please enter a password.');
            return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // [START_EXCLUDE]
            if (errorCode === 'auth/wrong-password') {
                alert('Wrong password.');
            } else {
                alert(errorMessage);
            }
            console.log(error);
            // [END_EXCLUDE]
        });
        // [END authwithemail]


    };

}

function LogoutController($state) {
    firebase.auth().signOut().then(function() {
        $state.go('login');
    }, function(error) {
        console.log(error);
    });

    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {                // [START signout]
    //
    //         // var onlineUserName = user.email.substring(0, user.email.lastIndexOf("@"));
    //         // OnlineUsers.removeOnline(onlineUserName);
    //         firebase.auth().signOut().then(function () {
    //             $state.go('home');
    //         }, function (error) {
    //             console.log(error);
    //             $state.go('login');
    //         });
    //     }
    //         // firebase.auth().onAuthStateChanged(function (user) {
    //         //     if (user) {
    //         //         firebase.auth().signOut();
    //         //         $state.go('home');
    //         //     }
    //
    //     // });
    // });


}

function AoController($scope,$firebaseArray,$state) {
    // $scope.user = firebase.auth().currentUser;
    var user = firebase.auth().currentUser;
    var email = "";
    if(user){
        console.log(user.displayName);
        $scope.userid = user.uid;
        email = user.email;
        var ref = firebase.database().ref('messages').orderByChild('uid').equalTo($scope.userid);
        $scope.messages = $firebaseArray(ref);
    } else {
             $state.go('login');
         }

    // firebase.auth().onAuthStateChanged(function (user) {
    //     if (user) {
    //         $scope.userid = user.uid;
    //         email = user.email;
    //         var ref = firebase.database().ref('messages').orderByChild('uid').equalTo($scope.userid);
    //         $scope.messages = $firebaseArray(ref);
    //     } else {
    //         $state.go('login');
    //     }
    // });
    var onlineRef = firebase.database().ref('online');
    $scope.onlineUsers = $firebaseArray(onlineRef);
    // SEND
    $scope.send = function () {
        var userId = $scope.userid;

        var username = email.substring(0, email.lastIndexOf("@"));
        console.log(username);
        // A message entry.
        var message = {
            uid: userId,
            from: username,
            content: $scope.message,
            createdDate: new Date()
        };

        // Get a key for a new product.
        var key = firebase.database().ref().child('messages').push().key;

        var updates = {};
        updates['/messages/' + key] = message;

        return firebase.database().ref().update(updates, function (error) {
            if (error) {
                console.log('Synchronization failed');
            } else {
                console.log('Synchronization succeeded');
                $scope.message = "";
            }
        });
    };

}

angular
    .module('myApp')
    .controller("MainController", MainController)
    .controller("HomeController", HomeController)
    .controller("LoginController", LoginController)
    .controller("LogoutController", LogoutController)
    .controller("AoController", AoController)
    .factory("ChatMessages", ["$firebaseArray", function ($firebaseArray) {

        var ref = db.ref('messages').limitToLast(10);
        var allMessages = $firebaseArray(ref);
        return {
            all: allMessages,
            create: function (message) {
                return allMessages.$add(message);
            }
        }}
    ])
    .factory("OnlineUsers",["$firebaseArray",function ($firebaseArray) {
        var userRef = db.ref('online');
        var allUsers = $firebaseArray(userRef);
        return {
            addOnline: function(onlineUser){
                return allUsers.$add(onlineUser);
            },
            removeOnline: function(onlineUserName){
                return allUsers.$remove(onlineUserName);
            }
        }

    }
    ])
;