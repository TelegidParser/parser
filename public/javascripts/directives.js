'use strict';

/* Directives */


angular.module('telegidApp.directives', []).
  directive('channelContent', function () {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: '/partials/channel-content',
      link: function (scope, element, attrs) {
      }
    }
  });