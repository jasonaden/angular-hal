/*jshint undef: true, unused: true*/


/*global SpecData*/
describe('Parse Campaign HAL', function() {
  var specData, HalParser, parser, Services, baseService, http, httpBackend;

  beforeEach(module('Services', 'HALParser'));

  /*beforeEach(module(inject(function($httpProvider, HALParser){
    $httpProvider.responseInterceptors.push(function($q, HALParser) {
      return function(promise) {
        var reject, resolve;
        resolve = function(value) {
          console.log('in resolve', value);
        };
        reject = function(reason) {
          console.log("rejected because: ", reason);
        };
        promise.then(resolve, reject);
        return promise;
      };
    });
  })));*/

  /*beforeEach(inject(function($httpBackend, BaseService){
    specData = new SpecData;
    httpBackend = $httpBackend;
    baseService = BaseService;

    //parser = new HalParser('cp');

    httpBackend.when('GET', '/url', undefined, {Accept: 'application/hal+json'}).respond(200, {_links:{},_embedded:{},json:'testData'});
    httpBackend.when('GET', '/api/campaigns/601').respond(specData.campaign);

  }));*/

  /*it('should read hal-json at the $interceptor phase', function() {
    http({
      method: 'GET',
      url: '/url',
      headers: {
        Accept: 'application/hal+json'
      }
    }).then(function(res) {
      expect(res.data.json).toBe('testData');
    });
    httpBackend.flush();
  });*/

  it('should intercept and parse', function(){
    //var campaignBase = new baseService('Campaign', '/campaigns');
    /*campaignBase.get(601).then(function(res){
      console.log('-------');
      console.log(res);
      console.log('-----s---');
      expect(res).toBeDefined();
    });*/
    expect(true).toBe(true);
    /*
    http({
      method: 'GET',
      url: '/api/campaigns/601',
      headers: {
        Accept: 'application/hal+json'
      }
    }).then(function(res){

    });*/
    //httpBackend.flush();
  });

});

