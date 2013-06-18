
((ng, mod) ->

  removeNamespace = (name, ns) ->
    if name.substr(0,ns.length) is ns then name.substr(ns.length) else name

  class Parser
    constructor: (@ns) ->
    parse: (hal) =>
      json = angular.copy hal

      {_links, _embedded} = json
      delete json._links
      delete json._embedded

      return new Resource json, _links, _embedded, @ns

    class Resource
      constructor: (data, links, embedded, ns) ->
        ns = if ns then ns + ':' else ''
        angular.extend @, data
        resourceLinks = new Links links

        for name, prop of embedded
          @[removeNamespace name, ns] = if ng.isArray prop then new Parser(ns).parse em, ns for em in prop else new Parser(ns).parse prop, ns

        @links = (name = '') ->
          key = if name is 'self' then name else if name.substr(0,ns.length) is ns then name else ns + name
          if resourceLinks[key] then resourceLinks[key] else resourceLinks

    class Links
      constructor: (links, ns) ->
        if !links?.self
          throw 'Self link is required'
        for name, link of links
          @[name] = if ng.isArray link then new Link lk, ns for lk in link else new Link link, ns

    class Link
      constructor: (link, ns) ->
        if !link?.href
          throw 'href is required for all links'
        @templated = !!link.templated
        @href = link.href
        @title = link.title or ''

  mod.constant('HALParser', Parser);

)(angular, angular.module('HALParser', []))