'use strict';

describe('Controller: HealthCtrl', function () {

  // load the controller's module
  beforeEach(module('customerSupportWebApp'));

  var HealthCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HealthCtrl = $controller('HealthCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(HealthCtrl.awesomeThings.length).toBe(3);
  });
});
