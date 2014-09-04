imtrade.factory('AuthService', function ($http, Session, WSCredential, $filter) {

	var authService = {};
	
	var today = $filter('date')(new Date(),'yyyy-MM-dd HH:mm:ss');
	
	authService.getToken = function () {
      return $http.
		get(WSCredential.api_url+':'+WSCredential.api_port+WSCredential.token_url,WSCredential.header).
		success(function(token) {
            Session.api_token = token;
        });
   }; 
   
   authService.login = function (credentials) {
      return $http.
		post(WSCredential.api_url+':'+WSCredential.api_port+WSCredential.login_url,credentials,WSCredential.header);
   };  
   
   authService.recentPost = function () {
      return $http.
		get(WSCredential.api_url+':'+WSCredential.api_port+WSCredential.node_url, WSCredential.header);
   };  
   authService.recentOrders = function () {
      return $http.
		get(WSCredential.api_url+':'+WSCredential.api_port+WSCredential.login_url, WSCredential.header);
   };  
    
   return authService;
});