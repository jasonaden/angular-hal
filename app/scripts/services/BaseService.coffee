# Factories are used to give each class it's own dependency management
((ng, mod) ->

  Base = ($log, $http, $q) ->

    # Private variables/functions
    _cache = {}
    _name = ''
    _url = ''
    _urlPrefix = '/api'

    # The instance-classes are returned at the end of the factory and can be injected (unmodified)
    class BaseService
      constructor: (name, url, options = {}) ->
        _name = name
        _url = url
        if options.urlPrefix then _urlPrefix = options.urlPrefix
        # wire up the events and hooks
        {
          @beforeRequest,
          @afterRequest,
          @onBeforeUpdate,
          @onAfterUpdate,
          @onBeforeLoad,
          @onAfterLoad
        } = options
      # Used to publish the status of the base service. This is not working right, as evidenced by the unit tests
      @status: null
      ### Generic send method ###
      send: (args) =>
        args.url = if _urlPrefix then _urlPrefix + args.url else args.url
        @status = 'sending'
        $log.log('sending', args)

        $http(args).then (data) =>
          @status = null
          if @afterRequest then @afterRequest data else return data

      ### Generic save method ###
      save: (data) ->
        $log.log('saving', data)
        if @beforeSave
          data = @beforeSave data
        @send data

      ### Get a list of items ###
      list: ->
        @send {method: 'GET', url: _url}

      ### Get a specific item ###
      get: (id) =>
        @send {method: 'GET', url: _url + '/' + id}

  Base.$inject = ['$log', '$http', '$q']


  mod
  .factory('BaseService', Base);
  ###.factory('ParentObject', ['BaseObject', '$cookies', (BaseObject, $cookies) ->
    class ParentObject extends BaseObject
      constructor: (options) ->
        super(options)
        $log.log('Parent created with', options)
      save: ->
        @send(@)
  ])
  .factory('ChildObject', ['ParentObject', (ParentObject) ->
    class ChildObject extends ParentObject
      save: ->
        @name = 'child'
        super()
  ])
  .factory('SingletonObject', ['BaseObject', (BaseObject) ->
    class SingletonObject extends BaseObject
      get: (args) ->
        @send(args)

    # Since the factory is also a constructor, you can use it to return a singleton instance
    new SingletonObject()
  ])
  .controller('MyCtrl', ['$scope', 'ChildObject', 'SingletonObject', ($scope, ChildObject, SingletonObject) ->
    $scope.item = new ChildObject()
    SingletonObject.get().then (data) ->
      $scope.options = data
  ])###
)(angular, angular.module('Services', []))