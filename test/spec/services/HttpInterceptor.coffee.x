
###jshint undef: true, unused: true###
###global SpecData###

describe 'Parse Campaign HAL', ->
  beforeEach module 'HALParser'
  beforeEach module ($injector, $httpProvider, $provide) ->
    @data = new SpecData
    @HalParser = $injector.get 'HALParser'
    @parser = new @HalParser 'cp'

    # configure the $httpProvider
    $httpProvider.responseInterceptors.push ($q, HALParser) ->
      ( promise ) ->

        # convert the returned data using values passed to $http.get()'s config param
        resolve = ( value ) ->
          console.log 'in resolve', value
          #convertList value.data, value.config.cls, value.config.initFn


        reject = ( reason ) ->
          console.log "rejected because: ", reason

        # attach our actions
        promise.then resolve, reject

        # return the original promise
        return promise


  it 'should read hal-json at the $interceptor phase', ->
    inject ($http, $httpBackend) ->
      $httpBackend.expect('GET', '/url', undefined, {Accept:'application/hal+json'}).respond('testData');
      $http({
        method: 'GET'
        url: '/url'
        headers: { Accept: 'application/hal+json' }
      })
      .then (data) ->
        expect(data.data).toBe('testData');
      $httpBackend.flush()


