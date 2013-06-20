(function() {
  (function(ng) {
    return ng.module('angularHalApp', []).config(function($routeProvider) {
      return $routeProvider.when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      }).otherwise({
        redirectTo: '/'
      });
    });
  })(angular);

}).call(this);
