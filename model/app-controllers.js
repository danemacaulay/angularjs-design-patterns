angular.module('ModelDemo').controller('ListCtrl', function ($scope, companyService) {
  companyService.getList().then(function(companies) {
    $scope.companies = companies;
  });
});

angular.module('ModelDemo').controller('CrmListCtrl', function ($scope, companyService, CompanyCRMVisitor) {
  companyService.getList(CompanyCRMVisitor).then(function(companies) {
    $scope.companies = companies;
  });
});

angular.module('ModelDemo').controller('CompanyDetailCtrl', function ($scope, $routeParams, companyService) {
    companyService.getById($routeParams.duns).then(function (company) {
        $scope.company = company;
    });
});
