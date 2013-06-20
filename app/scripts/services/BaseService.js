(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  (function(ng, mod) {
    var Base;
    Base = function($log, $http, $q) {
      var BaseService, _cache, _name, _url, _urlPrefix;
      _cache = {};
      _name = '';
      _url = '';
      _urlPrefix = '/api';
      return BaseService = (function() {
        function BaseService(name, url, options) {
          if (options == null) {
            options = {};
          }
          this.get = __bind(this.get, this);
          this.send = __bind(this.send, this);
          _name = name;
          _url = url;
          if (options.urlPrefix) {
            _urlPrefix = options.urlPrefix;
          }
          this.beforeRequest = options.beforeRequest, this.afterRequest = options.afterRequest, this.onBeforeUpdate = options.onBeforeUpdate, this.onAfterUpdate = options.onAfterUpdate, this.onBeforeLoad = options.onBeforeLoad, this.onAfterLoad = options.onAfterLoad, this.beforeSave = options.beforeSave, this.afterSave = options.afterSave;
        }

        BaseService.status = null;

        /* Generic send method*/


        BaseService.prototype.send = function(args) {
          var sendDefer,
            _this = this;
          args.url = _urlPrefix ? _urlPrefix + args.url : args.url;
          if (this.beforeRequest) {
            this.beforeRequest(data);
          }
          this.status = 'sending';
          /*$http(args).then (data) =>
            @status = null
            if @afterRequest then @afterRequest data else return data
          */

          sendDefer = $q.defer();
          $http(args).then(function(data) {
            _this.status = null;
            if (_this.afterRequest) {
              return sendDefer.resolve(_this.afterRequest(data));
            } else {
              return sendDefer.resolve(data);
            }
          });
          return sendDefer.promise;
        };

        /* Generic save method*/


        BaseService.prototype.save = function(data) {
          $log.log('saving', data);
          if (this.beforeSave) {
            data = this.beforeSave(data);
          }
          return this.send(data);
        };

        /* Get a list of items*/


        BaseService.prototype.list = function() {
          return this.send({
            method: 'GET',
            url: _url
          });
        };

        /* Get a specific item*/


        BaseService.prototype.get = function(id) {
          return this.send({
            method: 'GET',
            url: _url + '/' + id
          });
        };

        return BaseService;

      })();
    };
    Base.$inject = ['$log', '$http', '$q'];
    return mod.factory('BaseService', Base);
    /*.factory('ParentObject', ['BaseObject', '$cookies', (BaseObject, $cookies) ->
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
    ])
    */

  })(angular, angular.module('Services', []));

}).call(this);
