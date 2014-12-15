angular.module('agendaApp', ['firebase','ngRoute'])
		.constant('AUTH_EVENTS', {
  			loginSuccess: 'auth-login-success',
  			loginFailed: 'auth-login-failed',
  			logoutSuccess: 'auth-logout-success',
  			sessionTimeout: 'auth-session-timeout',
  			notAuthenticated: 'auth-not-authenticated',
  			notAuthorized: 'auth-not-authorized'
		})

		.constant('USER_ROLES', {
  			all: '*',
  			admin: 'admin',
  			professor: 'professor',
		})

		.config(function($routeProvider) {
			$routeProvider

				.when('/', {
					templateUrl : 'pages/horarios.html',
                	controller  : 'MainController'
				})
				.when('/usuarios', {
					templateUrl : 'pages/usuarios.html',
                	controller  : 'UsuariosController'
				})
				.when('/sobre',{
					templateUrl : 'pages/sobre.html',
                	controller  : 'SobreController'
				})
				.when('/alunos', {
					templateUrl : 'pages/alunos.html',
                	controller  : 'AlunosController'
				})
				.when('/projetos', {
					templateUrl : 'pages/projetos.html',
                	controller  : 'ProjetosController'
				})				
				.when('/login', {
					templateUrl : 'pages/login.html',
					controller  : 'LoginController'
				})
		})

		.factory('AuthService', function ($http, $firebase, Session) {
		  var authService = {};
		 
		  authService.login = function (credentials) {
		    return $http
		      .post('/login', credentials)
		      .then(function (res) {
		        Session.create(res.data.id, res.data.user.id,
		                       res.data.user.role);
		        return res.data.user;
		      });
		  };
		 
		  authService.isAuthenticated = function () {
		    return !!Session.userId;
		  };
		 
		  authService.isAuthorized = function (authorizedRoles) {
		    if (!angular.isArray(authorizedRoles)) {
		      authorizedRoles = [authorizedRoles];
		    }
		    return (authService.isAuthenticated() &&
		      authorizedRoles.indexOf(Session.userRole) !== -1);
		  };
		 
		  return authService;
		})

		.service('Session', function () {
		  this.create = function (sessionId, userId, userRole) {
		    this.id = sessionId;
		    this.userId = userId;
		    this.userRole = userRole;
		  };
		  this.destroy = function () {
		    this.id = null;
		    this.userId = null;
		    this.userRole = null;
		  };
		  return this;
		})
		
		.controller('MainController', function($scope, $firebase, USER_ROLES, AuthService){
			$scope.currentUser = null;
  			$scope.userRoles = USER_ROLES;
  			$scope.isAuthorized = AuthService.isAuthorized;
 
  			$scope.setCurrentUser = function (user) {
    			$scope.currentUser = user;
  			};


			var refDias = new Firebase("https://sweltering-inferno-5804.firebaseio.com/dias");

			var fbDias = $firebase(refDias);

			var diasSync = fbDias.$asObject();

			diasSync.$bindTo($scope, 'dias');

			$scope.reset = function(){
				fbDias.$set({
			      dia1: {
			        nome: 'Segunda',
			        turnos: {
				          manha: {
				          	nome: 'Manhã',
				            horario: '08:00-12:00',
				            marcado: false
				          },
				          tarde: {
				            nome: 'Tarde',
				            horario: '14:00-18:00',
				            marcado: false
				          },
				          noite: {
				            nome: 'Noite',
				            horario: '18:00-22:00',
				            marcado: false
				          }
			        }
			      },
			      dia2: {
			        nome: 'Terça',
			        turnos: {
			          manha: {
			            nome: 'Manhã',
			            horario: '08:00-12:00',
			            marcado: false
			          },
			          tarde: {
			            nome: 'Tarde',
				        horario: '14:00-18:00',
				        marcado: false
			          },
			          noite: {
				            nome: 'Noite',
				            horario: '18:00-22:00',
				            marcado: false
				      }
			        }
			      },
			      dia3: {
			        nome: 'Quarta',
			        turnos: {
			          manha: {
			            nome: 'Manhã',
			            horario: '08:00-12:00',
			            marcado: false
			          },
			          tarde: {
			            nome: 'Tarde',
				        horario: '14:00-18:00',
				        marcado: false
			          },
			          noite: {
				            nome: 'Noite',
				            horario: '18:00-22:00',
				            marcado: false
				          }
			        }
			      },
			      dia4: {
			        nome: 'Quinta',
			        turnos: {
			          manha: {
			            nome: 'Manhã',
			            horario: '08:00-12:00',
			            marcado: false
			          },
			          tarde: {
			            nome: 'Tarde',
				        horario: '14:00-18:00',
				        marcado: false
			          },
			          noite: {
				            nome: 'Noite',
				            horario: '18:00-22:00',
				            marcado: false
				          }
			        }
			      },
			      dia5: {
			        nome: 'Sexta',
			        turnos: {
			          manha: {
			            nome: 'Manhã',
			            horario: '08:00-12:00',
			            marcado: false
			          },
			          tarde: {
			            nome: 'Tarde',
				        horario: '14:00-18:00',
				        marcado: false
			          },
			          noite: {
				            nome: 'Noite',
				            horario: '18:00-22:00',
				            marcado: false
				          }
			        }
			      }

			    });
			}
		})

		.controller('UsuariosController',  function($scope, $firebase){
			$scope.message = "FALTA IMPLEMENTAR"

			var refUsuarios = new Firebase("https://sweltering-inferno-5804.firebaseio.com/usuarios");

			var fbUsuarios = $firebase(refUsuarios);

			var usuariosSync = fbUsuarios.$asObject();

			usuariosSync.$bindTo($scope, 'usuarios');

		})

		.controller('SobreController',  function($scope){
			$scope.message = "FALTA IMPLEMENTAR"
		})

		.controller('AlunosController',  function($scope, $firebase){
			$scope.message = "FALTA IMPLEMENTAR"

			var refAlunos = new Firebase("https://sweltering-inferno-5804.firebaseio.com/alunos");

			var fbAlunos = $firebase(refAlunos);

			var alunosSync = fbAlunos.$asObject();

			alunosSync.$bindTo($scope, 'alunos');
		})

		.controller('ProjetosController',  function($scope, $firebase){
			$scope.message = "FALTA IMPLEMENTAR"

			var refProjetos = new Firebase("https://sweltering-inferno-5804.firebaseio.com/projetos");

			var fbProjetos = $firebase(refProjetos);

			var projetosSync = fbProjetos.$asObject();

			projetosSync.$bindTo($scope, 'projetos');
		})

		.controller('LoginController',  function($scope, $rootScope, AUTH_EVENTS, AuthService){
			$scope.credentials = {
    			username: '',
    			password: ''
  			};


			$scope.login = function (credentials) {
    			AuthService.login(credentials).then(function (user) {
      			$rootScope.$broadcast(AUTH_EVENTS.loginSuccess);
     			$scope.setCurrentUser(user);
    		}, function () {
      				$rootScope.$broadcast(AUTH_EVENTS.loginFailed);
    			});
  			};			
		})
		;

