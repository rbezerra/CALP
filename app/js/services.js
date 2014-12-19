(function() {
   'use strict';

   /* Services */

   angular.module('myApp.services', [])

      // put your services here!
      // .service('serviceName', ['dependency', function(dependency) {}]);

     .factory('messageList', ['fbutil', function(fbutil) {
       return fbutil.syncArray('messages', {limit: 10, endAt: null});
     }])

     .factory('activeUser', ['$rootScope','fbutil', 'simpleLogin', function($rootScope, fbutil, simpleLogin){
     	simpleLogin.getUser().then(function(user, error) {
     		if (user) {
	            $rootScope.$emit("login", user);
	        }
	        else if (error) {
	            $rootScope.$emit("loginError", error);
	        }
	        else {
	            $rootScope.$emit("logout");
	            console.log("NÃO FEZ PORRA NENHUMA");
	        } 
     	});
     }]);

})();

