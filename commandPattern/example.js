angular.module('commandDemo', ['ui.bootstrap']);

angular.module('commandDemo').controller('ListCtrl', function($scope, $modal) {
  $scope.list = [
    {name: 'Asking Alexandria'},
    {name: 'Atreyu'},
    {name: 'Audioslave'},
    {name: 'Automatic Pilot'},
    {name: 'Avenged Sevenfold'},
    {name: 'A Wilhelm Scream'},
    {name: 'The B-52\'s'},
    {name: 'Babymetal'},
    {name: 'Bachman–Turner Overdrive'},
    {name: 'Bad Religion'},
    {name: 'Badfinger'},
    {name: 'The Band'},
    {name: 'Bauhaus'},
    {name: 'The Beatles'},
    {name: 'The Beautiful South'},
    {name: 'Belle & Sebastian'},
    {name: 'Between the Buried and Me'},
    {name: 'Biffy Clyro'},
    {name: 'Big Drill Car'}
  ];

  $scope.export = function() {
    $modal.open({
      templateUrl: 'exportModal.html',
      controller: 'ModalExportCtrl',
      resolve: {
        list: function() {
          return $scope.list;
        }
      }
    });
  }

  $scope.import = function() {
    $modal.open({
      templateUrl: 'importModal.html',
      controller: 'ModalImportCtrl',
      resolve: {
        list: function() {
          return $scope.list;
        }
      }
    });
  }
});

angular.module('commandDemo').factory('rangeManager', function() {

  /**
   * Return a request ready object
   * @param  obj range
   * @return obj rangeParams, an object to be parameterized in a request
   */
  function getParams(range) {
    return {
      limit: range.limit,
      offset: range.offset
    };
  }

  /**
   * Return a default range object from list
   * @param  array list
   * @return obj
   */
  function getDefaults(list) {
    return {
      limit: list.length,
      offset: 0,
      startingIndex: 1,
      endingIndex: list.length,
      count: list.length,
      limit: null,
      isValid: null
    }
  };

  /**
   * Validate range selection fields and set errors
   * @param  obj range
   * @return obj validatedRange, an range object object decorated with isValid, errorMessage, offset, limit
   * properties derived from starting and ending indices
   */
  function decorate(range) {
    var startingIndex = range.startingIndex;
    var endingIndex = range.endingIndex;
    var count = range.count;
    var validatedRange = {};

    validatedRange.isValid = false;
    validatedRange.limit = endingIndex - startingIndex + 1;
    validatedRange.offset = startingIndex - 1;
    validatedRange.errorMessage = '';
    if (angular.isUndefined(startingIndex) || angular.isUndefined(endingIndex)) {
      validatedRange.errorMessage = 'Please provide missing fields';
    } else if (startingIndex > endingIndex) {
      validatedRange.errorMessage = 'Invalid range';
    } else if (startingIndex <= 0 || endingIndex <= 0) {
      validatedRange.errorMessage = 'Index must be positive';
    } else if (endingIndex > count) {
      validatedRange.errorMessage = 'Out of range of current list';
    } else {
      validatedRange.isValid = true;
    }
    return validatedRange;
  }

  function processRange(range) {
    return angular.extend(range, decorate(range));
  }

  return {
    processRange: processRange,
    getParams: getParams,
    getDefaults: getDefaults,
  }
});

angular.module('commandDemo').controller('ModalExportCtrl', function($scope, $modalInstance, rangeManager, list) {

  // set defaults
  $scope.range = rangeManager.getDefaults(list);

  // decorate range object with validation properties when range values change
  $scope.$watch('range.startingIndex', function(newVal) {
    var rangeToProcess = angular.extend($scope.range, {
      startingIndex: newVal
    });
    $scope.range = rangeManager.processRange(rangeToProcess);
  });

  $scope.$watch('range.endingIndex', function(newVal) {
    var rangeToProcess = angular.extend($scope.range, {
      endingIndex: newVal
    });
    $scope.range = rangeManager.processRange(rangeToProcess);
  });

  // grab limit and offset and perform an import operation
  $scope.export = function() {
    var params = rangeManager.getParams($scope.range);
    // would ordinarily make a backend call
    alert('Exporting with limit: ' + params.limit + ', offset: ' + params.offset);
    // on success, close modal
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});

angular.module('commandDemo').controller('ModalImportCtrl', function($scope, $modalInstance, rangeManager, list) {

  // set defaults
  $scope.range = rangeManager.getDefaults(list);

  // decorate range object with validation properties when range values change
  $scope.$watch('range.startingIndex', function(newVal) {
    var rangeToProcess = angular.extend($scope.range, {
      startingIndex: newVal
    });
    $scope.range = rangeManager.processRange(rangeToProcess);
  });

  $scope.$watch('range.endingIndex', function(newVal) {
    var rangeToProcess = angular.extend($scope.range, {
      endingIndex: newVal
    });
    $scope.range = rangeManager.processRange(rangeToProcess);
  });

  // grab limit and offset and perform an import operation
  $scope.import = function() {
    var params = rangeManager.getParams($scope.range);
    // would ordinarily make a backend call
    alert('Importing with limit: ' + params.limit + ', offset: ' + params.offset);
    // on success, close modal
    $modalInstance.close();
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
});