
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

    return

  it 'should read hal-json at the $interceptor phase', ->
    inject ($http, $httpBackend) ->
      $httpBackend.expect('GET', '/url').respond('testData', {
        'Content-Type' : 'application/hal+json'
      });
      $http({
        method: 'GET'
        url: '/url'
      })
      .then (data) ->
        console.log data
      , (err) ->
        console.log err
      $httpBackend.flush()
    return

  return
