/* jshint undef: true, unused: true */
/* global SpecData */

'use strict';

describe('BaseService has methods for talking to the backend', function() {
  var data, baseService, $httpBackend, $q;

	// load the service's module
  beforeEach(module('Services'));

  // Load up the HAL data
  beforeEach(inject(function ($injector) {
    data = new SpecData();
    $q = $injector.get('$q');
    $httpBackend = $injector.get('$httpBackend');
    $httpBackend.when('GET', '/api/base/123').respond(JSON.stringify(data.campaign));
    $httpBackend.when('GET', '/api/base').respond(JSON.stringify(data.cells));
  }));

  // instantiate service
  beforeEach(inject(function(BaseService) {
    baseService = BaseService;
  }));

	it( 'should have methods to deal with remote data', function() {
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
		var baseInstance = new baseService('Base', '/base'),
      ret = baseInstance.get('123');
    expect(ret).toBeAPromise();
    $httpBackend.flush();
	});

  xit('should give an accurate status while retrieving results from the server', function () {
    var baseInstance = new baseService('Base', '/base'),
      ret;
    expect(baseService.status).toBe(null);
    // Call the backend
    ret = baseInstance.get('123');
    expect(baseService.status).not.toBe(null);
    $httpBackend.flush();
    expect(baseService.status).toBe(null);
  });

  var prom = Restangular.all('Base').getList().then(function (stuff) {
    stuff[0].getOne
  })

});
