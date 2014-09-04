var imtrade = angular.module("imtrade", ['ngRoute','ngResource','ngDialog','ngDropdowns','angularMoment','ngCookies','angularFileUpload']);

imtrade.constant('WSCredential',{
    api_url: 'http://localhost',
    api_port: '80',
	login_url :'/Restaurant/api/user/login',
    token_url: '/Restaurant/services/session/token',
	node_url: '/Restaurant/api/node',
    header: {"Content-Type" : "application/json"}    
});

imtrade.value('Session', {
    isActiveClass:'',
    uid:'',
    api_token:'',
    isLogin: false
});

imtrade.config(function($routeProvider, $locationProvider) {
  $routeProvider

  // route for the home page
  .when('/', {
    templateUrl : 'views/welcome.html',
    controller  : 'homeController'
  })
  //route for the login page
  .when('/login', {
    templateUrl : 'views/login.html',
    controller  : 'loginController'
  })
  // route for the not found page
  .otherwise({
    redirectTo: '/'
  });
  // use the HTML5 History API
  //$locationProvider.html5Mode(true);
});
