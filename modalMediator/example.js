angular.module('mediatorDemo', ['ui.bootstrap']);

angular.module('mediatorDemo').controller('UserProfileCtrl', function ($scope, $log, ModalWorkFlow) {

  // Bob hasnt fully registered yet
  $scope.user = {
    firstName: 'Bob',
    lastName: '',
    phone: '',
    email: '',
    status: 'new'
  };

  // kick off the registration presentation
  $scope.begin = function (user) {
    ModalWorkFlow.beginPresentation(angular.copy($scope.user));
  };

  // act on cancel event triggered by ModalWorkFlow
  $scope.$on('modalPresentation.canceled', function () {
    $scope.user.status = 'incomplete';
  });

  // act on finish event triggered by ModalWorkFlow
  var disconnect = $scope.$on('modalPresentation.finished', function (evt, user) {
    angular.extend($scope.user, user);
    $scope.user.status = 'finished';
    // disconnect the listener
    disconnect();
  });

});

angular.module('mediatorDemo').factory('ModalWorkFlow', function ($modal, $rootScope) {

  function beginPresentation (user) {
    openUserModal.call(user);
  }

  function openUserModal () {
    handler('userModalContent.html', this, openInfoModal);
  }

  function openInfoModal () {
    handler('infoModalContent.html', this, openReviewModal);
  }

  function openReviewModal () {
    handler('reviewModalContent.html', this);
  }

  // modal constructor, and close listener
  // responsible for displaying the modal and
  // either calling the next modal
  // or publishing the new user to subscribers
  function handler (templateUrl, user, nextModalOpenFn) {
    var modal = $modal.open({
      templateUrl: templateUrl,
      controller: 'UserModalCtrl',
      // resolve will inject user into our controller as a dependency called 'user'
      resolve: {
        user: function () {
          return user;
        }
      }
    });

    // modal.result is a promise that is resolved
    // when $modalInstance in the modal controller calls close or dismiss
    modal.result.then(
      // success callback
      function close(user) {
        if (nextModalOpenFn) {
          nextModalOpenFn.call(user);
        }
        else {
          $rootScope.$broadcast('modalPresentation.finished', user)
        }
      },
      // fail callback
      function dismiss() {
        $rootScope.$broadcast('modalPresentation.canceled')
      }
    );
  }

  // public interface
  return {
    beginPresentation: beginPresentation
  }

});

angular.module('mediatorDemo').controller('UserModalCtrl', function ($scope, $modalInstance, user) {

  $scope.user = user;

  $scope.ok = function () {
    $modalInstance.close($scope.user);
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };

});
