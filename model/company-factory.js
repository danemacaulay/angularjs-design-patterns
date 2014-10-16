
// model provider
angular.module('baseModel').factory('companyFactory', function(Company, BaseCompany, CompanyCRMVisitor) {
  Company.prototype = new BaseCompany();
  var globalVisitor;
  var companyFactory = {
    setGlobalVisitor: function(visitor) {
      globalVisitor = visitor;
    },
    createCompany: function(obj, visitor) {
      var company = new Company(obj);
      if (globalVisitor) {
        angular.extend(company, globalVisitor);
      }
      if (visitor) {
        angular.extend(company, visitor);
      }
      return company;
    },
    createCollection: function(data, visitor) {
      var companies = [];
      data.forEach(function(obj) {
        this.push(companyFactory.createCompany(obj, visitor));
      }, companies)
      return companies;
    },
  };
  return companyFactory;
});