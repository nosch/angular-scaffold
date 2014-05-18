/**
 * Sample Application - angular-scaffold
 * @module application.controller
 */
angular.module('application.controller', [])

    .controller('NavigationCtrl', function ($scope, NAV_ITEMS) {
        'use strict';

        $scope.navItems = NAV_ITEMS;
    })

    .controller('HomeCtrl', function ($scope) {
        'use strict';

        $scope.heading = 'Angular Scaffold!';
    });
