do (ng = angular) ->
    ng.module('angularHalApp', [])
    .config ($routeProvider) ->
      $routeProvider
          .when '/',
              templateUrl: 'views/main.html'
              controller: 'MainCtrl'
          .otherwise
              redirectTo: '/'