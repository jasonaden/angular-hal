# jshint undef: true, unused: true

# global SpecData
"use strict"
describe "Parse HAL", ->
  data = undefined
  HalParser = undefined
  parser = undefined
  {isEmpty, isArray} = angular

  # load the service's module
  beforeEach module("HALParser")

  # Load up the HAL data
  beforeEach inject(($injector) ->
    data = new SpecData()
    HalParser = $injector.get("HALParser")
    parser = new HalParser("ns")
  )

  it "should have access to _links data", ->
    parsed = parser.parse(data.simpleHal)

    # Make sure links is a method
    expect(parsed.links).toBeDefined()
    expect(typeof parsed.links).toBe 'function'
    # Get collection of links as object
    expect(typeof parsed.links()).toBe 'object'
    # Check self link
    expect(typeof parsed.links().self).toBe 'object'
    expect(typeof parsed.links().self.href).toBe 'string'
    expect(parsed.links().self.href).toBe '/dummy'
    # Get specific link
    expect(parsed.links('self').href).toBe '/dummy'

  it "should parse empty HAL data", ->
    parsed = parser.parse(data.simpleHal)

    expect(parsed).toBeDefined()
    expect(typeof parsed).toBe 'object'
    # Verify that an empty object being parsed only returns 'links'
    expect(Object.keys(parsed).toString()).toBe 'links'
    expect(parsed.links('cell')).toBeDefined()

  it "should throw an error on bad HAL data", ->
    expect(parser.parse.bind(null, data.noHref)).toThrow()
    expect(parser.parse.bind(null, data.noSelf)).toThrow()
    expect(parser.parse.bind(null, data.noLinks)).toThrow()

  it "should parse basic HAL data", ->
    parsed = parser.parse(data.basicHal)

    expect(parsed.shippedToday).toBe 20
    expect(parsed.links('next').href).toBe '/orders?page=2'
    expect(isArray parsed.links('admin')).toBe true

  it "should parse namespaces", ->
    parsed = parser.parse(data.namespaceHal)
    expect(parsed.currentlyProcessing).toBe 14
    expect(parsed.items).toBeDefined()
    expect(parsed.items[0].user).toBeDefined()

  it "should parse namespaces", ->
    parsed = parser.parse(data.namespaceHal)
    expect(parsed.currentlyProcessing).toBe 14
    expect(parsed.items[0].name).toBe "Order One"
    expect(typeof parsed.items[0].links).toBe "function"
    expect(parsed.items[0].user.name).toBe "User One"
    expect(typeof parsed.items[0].user.links).toBe "function"
