/**
 * Sample Application - angular-scaffold
 * @module application
 */
angular.module('application', [
        'application.controller',
        'ui.router'
    ])

    .constant('NAV_ITEMS', [
        {title: 'Home', state: 'home', sref: 'home', icon: 'glyphicon-home'},
        {title: 'About', state: 'about', sref: 'about', icon: 'glyphicon-info-sign'},
        {title: 'Contact', state: 'contact', sref: 'contact', icon: 'glyphicon-earphone'}
    ])

    .config(function ($stateProvider, $urlRouterProvider) {
        'use strict';

        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'view/home.tpl.html',
                controller: 'HomeCtrl'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'view/about.tpl.html'
            })
            .state('contact', {
                url: '/contact',
                templateUrl: 'view/contact.tpl.html'
            });
    })

    .run(function ($rootScope, $state, $stateParams) {
        'use strict';

        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    });
