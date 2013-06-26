function SpecData(){

}

SpecData.prototype.simpleHal = {
    _links: {
      self: {
        href: '/dummy'
      },
      'ns:cell': {
        href: '/cell',
        name: 'Cell'
      }
    }
  };

SpecData.prototype.noHref = {
    _links: {
      self: '/dummy'
    }
  };

SpecData.prototype.noSelf = {
  _links: {

  }
};

SpecData.prototype.noLinks = {

};

SpecData.prototype.basicHal = {
  '_links': {
    'self': { 'href': '/orders' },
    'ns:next': { 'href': '/orders?page=2' },
    'find': { 'href': '/orders{?id}', 'templated': true },
    'admin': [
      { 'href': '/admins/2', 'title': 'Fred' },
      { 'href': '/admins/5', 'title': 'Kate' }
    ]
  },
  currentlyProcessing: 14,
  shippedToday: 20
};

SpecData.prototype.basicHalNoLinks = {
  currentlyProcessing: 14,
  shippedToday: 20
};

SpecData.prototype.namespaceHal = {
  '_links': {
    'self': { 'href': '/orders' }
  },
  '_embedded': {
    'ns:items': [
      {
        '_links': {
          'self': { 'href': '/items/1' }
        },
        '_embedded': {
          'ns:user': {
            '_links': {
              'self': { 'href': '/user/1' }
            },
            'name': 'User One'
          }
        },
        'name': 'Order One'
      }
    ]
  },
  currentlyProcessing: 14,
  shippedToday: 20
};



SpecData.prototype.complexHal = {
    '_links': {
      'self': { 'href': '/orders' },
      'next': { 'href': '/orders?page=2' },
      'find': { 'href': '/orders{?id}', 'templated': true },
      'admin': [
        { 'href': '/admins/2', 'title': 'Fred' },
        { 'href': '/admins/5', 'title': 'Kate' }
      ]
    },
    currentlyProcessing: 14,
    shippedToday: 20,
    '_embedded': {
      'orders': [
        {
          '_links': {
            'self': { 'href': '/orders/123' },
            'basket': { 'href': '/baskets/98712' },
            'customer': { 'href': '/customers/7809' }
          },
          'total': 30.00,
          'currency': 'USD',
          'status': 'shipped',
        },
        {
          '_links': {
            'self': { 'href': '/orders/124' },
            'basket': { 'href': '/baskets/97213' },
            'customer': { 'href': '/customers/12369' }
          },
          'total': 20.00,
          'currency': 'USD',
          'status': 'processing'
        }
      ],
      'user': {
        '_links': {
          'self': {'href': '/user/123'}
        },
        'name': 'Joe Jones'
      }
    }
  };
SpecData.prototype.complexBadHal = {
    '_links': {
      'self': { 'href': '/orders' },
      'next': { 'href': '/orders?page=2' },
      'find': { 'href': '/orders{?id}', 'templated': true },
      'admin': [
        { 'href': '/admins/2', 'title': 'Fred' },
        { 'href': '/admins/5', 'title': 'Kate' }
      ],
      currentlyProcessing: 14,
      shippedToday: 20,
      '_embedded': {
        'orders': [
          {
            '_links': {
              'self': { 'href': '/orders/123' },
              'basket': { 'href': '/baskets/98712' },
              'customer': { 'href': '/customers/7809' }
            },
            'total': 30.00,
            'currency': 'USD',
            'status': 'shipped',
          },
          {
            '_links': {
              'self': { 'href': '/orders/124' },
              'basket': { 'href': '/baskets/97213' },
              'customer': { 'href': '/customers/12369' }
            },
            'total': 20.00,
            'currency': 'USD',
            'status': 'processing'
          }
        ]
      }
    }
  };

