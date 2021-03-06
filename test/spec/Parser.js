// Generated by CoffeeScript 1.6.3
(function() {
  "use strict";
  describe("Parse HAL", function() {
    var HalParser, data, isArray, isEmpty, parser;
    data = void 0;
    HalParser = void 0;
    parser = void 0;
    isEmpty = angular.isEmpty, isArray = angular.isArray;
    beforeEach(module("HALParser"));
    beforeEach(inject(function($injector) {
      data = new SpecData();
      HalParser = $injector.get("HALParser");
      return parser = new HalParser("ns");
    }));
    it("should have access to _links data", function() {
      var parsed;
      parsed = parser.parse(data.simpleHal);
      expect(parsed.links).toBeDefined();
      expect(typeof parsed.links).toBe('function');
      expect(typeof parsed.links()).toBe('object');
      expect(typeof parsed.links().self).toBe('object');
      expect(typeof parsed.links().self.href).toBe('string');
      expect(parsed.links().self.href).toBe('/dummy');
      return expect(parsed.links('self').href).toBe('/dummy');
    });
    it("should allow _links to not exist", function() {
      var parsed;
      parsed = parser.parse(data.basicHalNoLinks);
      expect(parsed.links).toBeDefined();
      return expect(typeof parsed.links).toBe('function');
    });
    it("should parse empty HAL data", function() {
      var parsed;
      parsed = parser.parse(data.simpleHal);
      expect(parsed).toBeDefined();
      expect(typeof parsed).toBe('object');
      expect(Object.keys(parsed).toString()).toBe('links');
      return expect(parsed.links('cell')).toBeDefined();
    });
    it("should throw an error on bad HAL data", function() {
      expect(parser.parse.bind(null, data.noHref)).toThrow();
      expect(parser.parse.bind(null, data.noSelf)).toThrow();
      return expect(parser.parse.bind(null, data.noLinks)).not.toThrow();
    });
    it("should parse basic HAL data", function() {
      var parsed;
      parsed = parser.parse(data.basicHal);
      expect(parsed.shippedToday).toBe(20);
      expect(parsed.links('next').href).toBe('/orders?page=2');
      return expect(isArray(parsed.links('admin'))).toBe(true);
    });
    it("should parse namespaces", function() {
      var parsed;
      parsed = parser.parse(data.namespaceHal);
      expect(parsed.currentlyProcessing).toBe(14);
      expect(parsed.items).toBeDefined();
      return expect(parsed.items[0].user).toBeDefined();
    });
    return it("should parse namespaces", function() {
      var parsed;
      parsed = parser.parse(data.namespaceHal);
      expect(parsed.currentlyProcessing).toBe(14);
      expect(parsed.items[0].name).toBe("Order One");
      expect(typeof parsed.items[0].links).toBe("function");
      expect(parsed.items[0].user.name).toBe("User One");
      return expect(typeof parsed.items[0].user.links).toBe("function");
    });
  });

}).call(this);
