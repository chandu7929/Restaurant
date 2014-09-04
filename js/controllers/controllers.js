// create the controller and inject Angular's $scope

imtrade.controller("commonController", function ($scope, $rootScope, ngDialog, AuthService, Session, $location, $routeParams, $upload) {

  $rootScope.jsonData = '{"foo": "bar"}';
  $rootScope.theme = 'ngdialog-theme-default';

  //intializing scope variables
  $scope.rememberMe = true;
  $scope.loading = false;
  $scope.loading1 = false;
  
  //Current user profile
  $scope.userProfile = null; 
  $scope.welcomeUser = null;
  $rootScope.recentPost = [];
  
  //Setting current user.
  $scope.managerId = null;
  $scope.activeClass = '';
  $scope.setActiveClass = function(){
    $scope.activeClass = 'cmenu'; 
  };
  $rootScope.errormsg = $rootScope.successmsg = false;
  $scope.currentUser =null;
  $scope.setCurrentUser = function(user){
  $scope.currentUser = user;
  $scope.userid = user.uid;
  //$scope.managerId = user.profile.field_manager ? user.profile.field_manager.target_id : null;
  $scope.isLogin = Session.isLogin = true;
  $scope.welcomeUser = user.name;
	$scope.setUserSettingMenu();
  };
  
  //User menu setting
  $scope.setUserSettingMenu = function() {
    $scope.userSettingsMenu = 
    [
        {
            text: $scope.welcomeUser,
            href: '#/profile'
        }, {
            text: 'Profile',
            href: '#/profile'
        }, {
            divider: true
        }, {
            text: 'Log out',
            href: '#/logout'
        }
    ];
  };
  $scope.userSettingsMenuSelected = {};
});

//All others controller start from here
imtrade.controller("loginController", function ($scope, $location, $cookies, $rootScope,AuthService) {

	$scope.credentials = {};
	$rootScope.errormsg = $rootScope.successmsg =false;
	$scope.credentials = {
            username: $cookies.username?$cookies.username:'',
            password: $cookies.password?$cookies.password:''
    };
	$scope.setRememberMe = function(){
		$scope.rememberMe = !$scope.rememberMe ? true : false;
	};

    $scope.doLogin = function (form) {
    $scope.loading = true;
    $rootScope.errormsg =false;
    if($scope.rememberMe){
    	$cookies.username = $scope.credentials.username;
        $cookies.password = $scope.credentials.password;  
    }else {
    	$cookies.username = '';
        $cookies.password = '';
    }
	AuthService.getToken();//Setting session token.
		if(form.$valid) {
			AuthService.login($scope.credentials).success(function(data){
			$scope.setCurrentUser(data.user);
			//alert(JSON.stringify(data.user));
				$scope.loading = false;
				$location.path("/");
			}).
			error(function(error){
				$rootScope.errormsg = error;
				$scope.loading = false;
			});
			
		}else {
			$rootScope.errormsg ='Invalid username or password';
			$scope.loading = false;
		}
    };
});

imtrade.controller("profileController", function ($scope, $location, Session,$rootScope) {
    if(!Session.isLogin){$scope.doSessionExpire();$location.path('/login');}
	$rootScope.errormsg = $rootScope.successmsg = false;
});

imtrade.controller("homeController", function ($scope, $location, AuthService, Session, ngDialog,$rootScope) {
    $rootScope.errormsg = $rootScope.successmsg = false;
    $scope.loading = true;
	//$scope.loading1 = true;
    if(Session.isLogin && Session.api_token !=''){  
        $scope.setActiveClass();
		 AuthService.recentPost().success(function (recentPost) {
		 //alert(JSON.stringify(recentPost));
		 $rootScope.recentPost = recentPost;
	    $scope.loading = false;
        }).error(function (error) {
            $rootScope.errormsg =" something went wrong !";$scope.loading = false;
        });
    }else {
        $scope.loading = false;$location.path('/login');
    }
});