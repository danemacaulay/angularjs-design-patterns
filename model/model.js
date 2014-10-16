var baseModel = angular.module('baseModel', []);

// company prototype
baseModel.constant('BaseCompany', function() {
  this.count = 0;
  this.add = function() {
    return this.count++;
  };
  this.subtract = function() {
    return this.count--;
  };
});

baseModel.service('Company', function() {
  return function(data) {
    angular.extend(this, data);
  }
});

// company mixin with CRM functionality
baseModel.constant('CompanyCRMVisitor', {
  CRM: true,
  addToCRM: function() {
    this.inCRM = true;
  },
  removeFromCRM: function() {
    this.inCRM = false;
  }
});

// company mixin with List plus functionality
baseModel.service('CompanyPlusVisitor', function($http, $rootScope) {
  this.plus = true;
  this.getText = function(company) {
    $http.get('http://baconipsum.com/api/?type=meat-and-filler')
      .then(function(resp) {
        company.text = resp.data.pop();
      });
  };

  this.saveCompany = function(company) {
    $http.post('http://baconipsum.com/api/?type=meat-and-filler')
      .then(function() {
        company.saved = true;
      });
  };
});