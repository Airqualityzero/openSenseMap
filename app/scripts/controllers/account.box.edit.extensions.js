(function () {
  'use strict';

  angular
    .module('openSenseMapApp')
    .controller('EditBoxExtensionsController', EditBoxExtensionsController);

  EditBoxExtensionsController.$inject = ['notifications', 'boxData', 'AccountService'];

  function EditBoxExtensionsController (notifications, boxData, AccountService) {
    var vm = this;
    vm.save = save;

    vm.extensions = {
      feinstaub: {
        id: '',
        disabled: false
      }
    };

    activate();

    ////

    function activate () {
      if (boxData.model.includes('Feinstaub')) {
        vm.extensions.feinstaub.id = 'feinstaub';
        vm.extensions.feinstaub.disabled = true;
      }
    }

    function save () {
      var data = {
        'addons': {
          'add': vm.extensions.feinstaub.id
        }
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
  }
})();
