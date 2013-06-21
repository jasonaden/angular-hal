#angular-hal

###Using HAL resources with AngularJS

angular-hal is used to parse [HAL (Hyptertext Application Language)](http://stateless.co/hal_specification.html) JSON structures into usable JavaScript objects. It ties in to AngularJS as a module with a `angular.constant` variable (so it could be used in the configuration phase of your application).

### Usage

```javascript
angular.module('myApp', ['HALParser'])
	.controller('myCtrl', function ($scope, $http, HALParser) {
    	var parser = new HALParser();
    
    	$http.get('/mydata.json').then(function (myHalData) {
        	$scope.myData = parser.parse(myHalData);
        });
    })

```
