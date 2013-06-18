'use strict';

describe('Service: HALParser', function() {
  var data, HalParser;

  // load the service's module
  beforeEach(module('HALParser'));

  // Load up the HAL data
  beforeEach(function () {
    data = new SpecData();
  });

  beforeEach(inject(function(HALParser) {
    HalParser = HALParser;
  }));

  it( 'HALParser should be a function', function() {
    expect(HalParser).toBeTruthy();
    expect(typeof HalParser).toBe('function');
    var inst = new HalParser('cp');
    expect(typeof inst.parse).toBe('function');
  });

  it('should parse basic HAL', function () {
    var parser = new HalParser('cp'),
      parsed = parser.parse(data.simpleHal);

    expect(parsed).toBeTruthy();
    expect(parsed.links).toBeTruthy();
    expect(typeof parsed.links).toBe('function');
    expect(parsed.links()).toBeTruthy();
    expect(parsed.links('self').href).toBe('/dummy');
    expect(parsed.links('cell').href).toBe('/cell');
  });

  it('should use namespace if passed', function () {
    var parser = new HalParser('cp'),
      parsed = parser.parse(data.simpleHal);

    expect(parsed.links('cell').href).toBe('/cell');
    expect(parsed.links('cp:cell').href).toBe('/cell');
  });

  it('should parse arrays of links', function () {
    var parser = new HalParser(),
      parsed = parser.parse(data.basicHal);
    expect(angular.isArray(parsed.links('admin'))).toBeTruthy();
    expect(parsed.links('admin').length).toBe(2);
    expect(parsed.links('admin')[0].href).toBe('/admins/2');
    expect(parsed.links('admin')[1].href).toBe('/admins/5');
  });

  it('should map base embedded properties', function () {
    var parser = new HalParser(),
      parsed = parser.parse(data.basicHal);

    expect(parsed.currentlyProcessing).toBe(14);
    expect(parsed.shippedToday).toBe(20);
  });

  it('should parse _embedded properties', function () {
    var parser = new HalParser(),
      parsed = parser.parse(data.complexHal);

    expect(parsed.orders).toBeTruthy();
    expect(angular.isArray(parsed.orders)).toBe(true);
    expect(typeof parsed.orders[0].links).toBe('function');
    expect(parsed.orders[0].links('basket').href).toBe('/baskets/98712');
    expect(parsed.user).toBeTruthy();
    expect(parsed.user.name).toBe('Joe Jones');
    expect(parsed.user.links('self').href).toBe('/user/123');

//    expect(parsed.embedded().orders).toBeTruthy();
//    expect(parsed.embedded('orders')).toBeTruthy();
//    expect(angular.isArray(parsed.embedded('orders'))).toBe(true);

  });



});
