/*jshint undef: true, unused: true*/


/*global SpecData*/


(function() {
  describe('Parse Campaign HAL', function() {
    beforeEach(module('HALParser'));
    beforeEach(module(function($injector, $httpProvider, $provide) {
      this.data = new SpecData;
      this.HalParser = $injector.get('HALParser');
      this.parser = new this.HalParser('cp');
      $httpProvider.responseInterceptors.push(function($q, HALParser) {
        return function(promise) {
          var reject, resolve;
          resolve = function(value) {
            return console.log('in resolve', value);
          };
          reject = function(reason) {
            return console.log("rejected because: ", reason);
          };
          promise.then(resolve, reject);
          return promise;
        };
      });
    }));
    it('should read hal-json at the $interceptor phase', function() {
      inject(function($http, $httpBackend) {
        $httpBackend.expect('GET', '/url').respond('testData', {
          'Content-Type': 'application/hal+json'
        });
        $http({
          method: 'GET',
          url: '/url'
        }).then(function(data) {
          return console.log(data);
        }, function(err) {
          return console.log(err);
        });
        return $httpBackend.flush();
      });
    });
  });

}).call(this);
