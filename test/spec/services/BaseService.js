/* jshint undef: true, unused: true */
/* global SpecData */

'use strict';

describe('BaseService has methods for talking to the backend', function() {
  var data, baseService, $rootScope, $httpBackend, $q;

  // load the service's module
  beforeEach(module('Services'));

  // Load up the HAL data
  beforeEach(inject(function ($injector) {
    data = new SpecData();
    $q = $injector.get('$q');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $httpBackend.when('GET', '/api/base/123').respond(200,{id:1,foo:'bar'});
    $httpBackend.when('GET', '/api/base/12').respond(400);
    $httpBackend.when('GET', '/api/base').respond([1,2,3]);
    $httpBackend.when('POST', '/api/base').respond(200);
    $httpBackend.when('PUT', '/api/base/2').respond(200);
    $httpBackend.when('PATCH', '/api/base/123').respond(200);
    $httpBackend.when('DELETE', '/api/base/123').respond(200);
  }));

  // instantiate service
  beforeEach(inject(function(BaseService) {
    baseService = BaseService;
  }));

  it('should have methods to deal with remote data', function() {
    expect(baseService).toBeDefined();
    expect(typeof baseService).toBe('function');
    var inst = new baseService();
    expect(baseService.status).toBe(null);
    expect(typeof inst.send).toBe('function');
    expect(typeof inst.save).toBe('function');
    expect(typeof inst.list).toBe('function');
    expect(typeof inst.get).toBe('function');
  });

  it('HTTP calls should return a promise', function () {
    var baseInstance = new baseService('Base', '/base');
    expect(baseInstance.get('123')).toBeAPromise();
    expect(baseInstance.list()).toBeAPromise();
  });

  it('should give an accurate status while retrieving results from the server', function () {
    var baseInstance = new baseService('Base', '/base');

    //should have undefined status initially
    expect(baseInstance.status).toBeUndefined();

    //make simple request
    baseInstance.get('123');

    //should have sending status
    expect(baseInstance.status).toBe('sending');

    //flush the backend to complete transaction
    $httpBackend.flush();

    //should now have null status
    expect(baseInstance.status).toBeNull();
  });

  it('should retrieve results from the server', function () {
    var baseInstance = new baseService('Base', '/base', {contentType:'application/hal+json'});

    //valid get
    baseInstance.get('123').then(function(res){
      expect(res.status).toBe(200);
      expect(res.config.headers.Accept).toContain('application/hal+json');
      expect(res.data.id).toBe(1);
      expect(res.data.foo).toBe('bar');
    });
    $httpBackend.flush();

    //invalid get
    baseInstance.get('12').then(function(res){
      expect(res.status).toBe(400);
    });
    $httpBackend.flush();

    //valid list
    baseInstance.list().then(function(res){
      expect(res.status).toBe(200);
      expect(res.data.length).toBe(3);
    });
    $httpBackend.flush();

  });

  it('should save new records', function(){
    var baseInstance = new baseService('Base', '/base');

    baseInstance.save({id:2,foo:'bar'}).then(function(res){
      expect(res.status).toBe(200);
    });
    $httpBackend.flush();
  });

  it('should update records', function(){
    var baseInstance = new baseService('Base', '/base');

    baseInstance.update(2, {id:2,foo:'bar'}).then(function(res){
      expect(res.status).toBe(200);
    });
    $httpBackend.flush();
  });

  it('should patch records', function(){
    var baseInstance = new baseService('Base', '/base');

    baseInstance.patch(123, {id:123,foo:'bar2'}).then(function(res){
      expect(res.status).toBe(200);
    });
    $httpBackend.flush();
  });

  it('should delete records', function(){
    var baseInstance = new baseService('Base', '/base');

    baseInstance.delete(123).then(function(res){
      expect(res.status).toBe(200);
    });
    $httpBackend.flush();
  });

});


describe('BaseService should call configurable methods and fire events on http actions', function() {
  var data, baseService, $rootScope, $httpBackend, $q;

  // load the service's module
  beforeEach(module('Services'));

  // Load up the HAL data
  beforeEach(inject(function ($injector) {
    data = new SpecData();
    $q = $injector.get('$q');
    $httpBackend = $injector.get('$httpBackend');
    $rootScope = $injector.get('$rootScope');
    $httpBackend.when('GET', '/api/base/123').respond(200,{id:1,foo:'bar'});
    $httpBackend.when('GET', '/api/base/12').respond(400);
    $httpBackend.when('GET', '/api/base').respond([1,2,3]);
    $httpBackend.when('POST', '/api/base').respond(200);
    $httpBackend.when('PUT', '/api/base/2').respond(200, {});
  }));

  // instantiate service
  beforeEach(inject(function(BaseService) {
    baseService = BaseService;
  }));

  it('should call beforeRequest on any request', function () {
    var data = {},
      ret,
      config = {
        beforeRequest: function (request) {
          request.data.key = 'beforeRequest';
          return request;
        },
        afterRequest: function (req2) {
          req2.data.key = 'afterRequest';
          return req2;
        }
      },
      baseInstance = new baseService('Base', '/base', config);

    baseInstance.update(2, data)
      .then(function (returnData) {
        ret = returnData;
      });
    expect(data.key).toBe('beforeRequest');
    $httpBackend.flush();
    console.log('aft stuff', ret.data);
    expect(ret.data.key).toBe('afterRequest');


  });

});
