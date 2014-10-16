// company service, fetch and decorate data from rest
angular.module('baseModel').service('companyService', function($http, companyFactory, $filter) {
  function fetchData() {
    return $http.get('data.json');
  }

  function getById(duns, visitor) {
    return fetchData().then(function(resp) {
      var company = resp.data.filter(function(c) {
        return c.duns === duns;
      }).pop();

      return companyFactory.createCompany(company, visitor);
    });
  }

  function getList(visitor) {
    return fetchData().then(function(resp) {
      return companyFactory.createCollection(resp.data, visitor);
    });
  }

  return {
    getList: getList,
    getById: getById
  };
});
