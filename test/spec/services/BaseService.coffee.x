describe 'BaseService has methods for talking to the backend', () ->
  data = baseService = $httpBackend = $q = null

	# load the service's module
  beforeEach module('Services')

  # Load up the HAL data
  beforeEach inject ($injector) ->
    data = new SpecData()
    $q = $injector.get '$q'
    $httpBackend = $injector.get '$httpBackend'
    $httpBackend.when('GET', '/api/base/123').respond(JSON.stringify(data.campaign))
    $httpBackend.when('GET', '/api/base').respond(JSON.stringify(data.cells))

  # instantiate service #
  beforeEach inject (BaseService) ->
    baseService = BaseService

	it 'should have methods to deal with remote data', () ->
      expect(baseService).toBeDefined()
      expect(typeof baseService).toBe('function')
      inst = new baseService()
      expect(baseService.status).toBe null
      expect(typeof inst.send).toBe('function')
      expect(typeof inst.save).toBe('function')
      expect(typeof inst.list).toBe('function')
      expect(typeof inst.get).toBe('function')


	it 'HTTP calls should return a promise', () ->
      baseInstance = new baseService 'Base', '/base'
      ret = baseInstance.get('123')
      expect(ret).toBeAPromise()
      $httpBackend.flush()
      ret = baseInstance.get()
      expect(ret).toBeAPromise()
      #


  xit 'should give an accurate status while retrieving results from the server', () ->
      baseInstance = new baseService 'Base', '/base',
      ret = null
      expect(baseService.status).toBe null
      # Call the backend
      ret = baseInstance.get('123')
      expect(baseService.status).not.toBe null
      $httpBackend.flush()
      expect(baseService.status).toBe null