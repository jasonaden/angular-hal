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
    $httpBackend.when('GET', '/api/base/123').respond(200, {id:1,foo:'bar'});
    $httpBackend.when('GET', '/api/base/12').respond(400);
    $httpBackend.when('GET', '/api/base').respond([1,2,3]);
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

  it('should successfully retrieve results from the server', function () {
    var baseInstance = new baseService('Base', '/base');

    //valid get
    baseInstance.get('123').then(function(res){
      expect(res.status).toBe(200);
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

});
