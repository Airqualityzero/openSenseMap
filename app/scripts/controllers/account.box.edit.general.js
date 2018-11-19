(function () {
  'use strict';

  angular
    .module('openSenseMapApp')
    .controller('EditBoxGeneralController', EditBoxGeneralController);

  EditBoxGeneralController.$inject = ['$state', '$document', 'notifications', 'boxData', 'AccountService'];

  function EditBoxGeneralController ($state, $document, notifications, boxData, AccountService) {
    var vm = this;
    vm.editingMarker = {};
    vm.password = '';

    vm.save = save;
    vm.deleteBox = deleteBox;
    vm.flowFileAdded = flowFileAdded;

    activate();

    ////

    function activate () {
      angular.copy(boxData, vm.editingMarker);
    }

    function save () {
      var imgsrc = angular.element($document.getElementById('flowUploadImage')).attr('src');
      var data = {
        name: vm.editingMarker.name,
        description: vm.editingMarker.description,
        weblink: vm.editingMarker.weblink,
        grouptag: vm.editingMarker.grouptag,
        exposure: vm.editingMarker.exposure,
        image: imgsrc
      };

      return AccountService.updateBox(boxData._id, data)
        .then(function (response) {
          angular.copy(response.data, boxData);
          notifications.addAlert('info', 'NOTIFICATION_BOX_UPDATE_SUCCESS');
        })
        .catch(function () {
          notifications.addAlert('danger', 'NOTIFICATION_BOX_UPDATE_FAILED');
        });
    }

    function deleteBox () {
      var data = {
        password: vm.password
      };

      return AccountService.deleteBox(boxData._id, data)
        .then(function () {
          notifications.addAlert('info', 'NOTIFICATION_BOX_DELETE_SUCCESS');
        })
        .catch(function () {
          notifications.addAlert('danger', 'NOTIFICATION_BOX_DELETE_FAILED');
        });
    }

    function flowFileAdded (file) {
      if (file.size < 500000) {
        vm.imageToBig = false;

        return true;
      }
      vm.imageToBig = true;

      return false;
    }
  }
})();
