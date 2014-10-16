/*global angular: false, alert: false*/

var app = angular.module('ModelDemo', ['baseModel', 'ngRoute']);

app.config(function($routeProvider) {
  $routeProvider
    .when('/list', {
      templateUrl: 'list.html',
      controller: 'ListCtrl'
    })
    .when('/crm', {
      templateUrl: 'list-crm.html',
      controller: 'CrmListCtrl'
    })
    .when('/company/:duns', {
      templateUrl: 'company-detail.html',
      controller: 'CompanyDetailCtrl',
    })
    .otherwise({
      redirectTo: '/list'
    });
});

// set global decorator
app.run(function(companyFactory, CompanyPlusVisitor, $rootScope, $route) {
  $rootScope.$watch('listPlus', function (newVal) {
    if (newVal) {
      companyFactory.setGlobalVisitor(CompanyPlusVisitor);
    }
    else {
      companyFactory.setGlobalVisitor({});
    }
    $route.reload();
  })
});
