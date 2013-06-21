/* jshint undef: true, unused: true */
/* global SpecData */

'use strict';

describe('Parse Campaign HAL', function() {
  var data, HalParser, parser;

  // load the service's module
  beforeEach(module('angularHalApp','HALParser'));

  // Load up the HAL data
  beforeEach(inject(function ($injector) {
    data = new SpecData();
    HalParser = $injector.get('HALParser');
    parser = new HalParser('cp');
  }));

	it( 'should parse basic Campaign HAL data (array embed 0)', function() {
		var parsed = parser.parse(data.campaign);
    expect(angular.isArray(parsed.suggested_lists)).toBeTruthy();
    expect(typeof parsed.cell_version).toBe('string');
    expect(parsed.cell_counts).toBeDefined();
    expect(parsed.cell_counts.unevaluated).toBe(20);
    expect(parsed.links('update')).toBeDefined();
    expect(parsed.links('update').href).toBe('/api/campaigns/601/601');
	});

	it( 'should parse basic lists of campaigns', function() {
		var parsed = parser.parse(data.campaigns);
    expect(parsed.campaign).toBeDefined();
    expect(angular.isArray(parsed.campaign)).toBe(true);
    expect(parsed.campaign[0].cell_counts).toBeDefined();
    expect(parsed.campaign[0].cell_counts.evaluated).toBe(2);
    expect(parsed.campaign[0].creator).toBe('bdd');
    expect(parsed.campaign[0].links()).toBeDefined();
	});

  it('should parse Asset data', function () {
    var parsed = parser.parse(data.installed_assets),
      first;
    expect(parsed.cell_references).toBeDefined();
    expect(angular.isArray(parsed.cell_references)).toBe(true);
    expect(parsed.assets).toBeDefined();
    expect(angular.isArray(parsed.assets)).toBe(true);
    first = parsed.assets[0];
    expect(first.is_mcoe).toBe(true);
    expect(first.treatment.source_treatment_nbr).toBe(125);
  });

  it('should parse new Asset data', function () {
    var asset = parser.parse(data.asset),
        asset2 = parser.parse(data.asset2),
      first;
    expect(asset.asset).toBeDefined();
    expect(asset2.asset).toBeDefined();
    expect(asset.asset.length).toBe(2);
    expect(asset2.asset.length).toBe(2);
    expect(asset.asset[0].name).toBe('one');
    expect(asset2.asset[0].name).toBe('one');
  });

  iit('should parse namespaces', function () {
    var parsed = parser.parse(data.namespaceHal);
    expect(parsed.currentlyProcessing).toBe(14);
    expect(parsed.items).toBeDefined();
    expect(parsed.items[0].name).toBe('Order One');
    expect(parsed.items[0].user).toBeDefined();
    expect(parsed.items[0].user.name).toBe('User One');

  });
});
