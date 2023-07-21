//  angular-autoreject-promises v0.0.1
//  https://github.com/pressreader/angular-autoreject-promises
//  (c) 2015 PressReader
//  this library may be freely distributed under the MIT license.
(function(angular) {

  'use strict';

  autorejectProvider.$inject = ['$provide'];
  function autorejectProvider($provide) {

    var defaults = {
          /**
           * Specifies an amount of time in milliseconds to wait,
           * until promise will be automatically rejected.
           */
          timeoutInterval: 5000,

          /**
           * boolean flag, to indicate whether rejections by timeout should be
           * written to $log service or not.
           */
          logTimeouts: true,

          /**
           * If set to false, this provider will not add timeout functionality
           * to $q service. It is recommended to enable this provider for debug purposes only.
           */
          enable: false
        },
        /**
         * current settings used by provider.
         */
        settings = defaults;

    timeoutQDecorator.$inject = ['$delegate', '$rootScope', '$log'];
    function timeoutQDecorator($delegate, $rootScope, $log) {

      var $Q              = $delegate,
          /**
           * this function creates a promise that gets automatically rejected
           * after timeout occurs.
           * @param {Error} error - error description to be used when rejecting this promise.
           * @returns {Promise} - promise object.
           * @private
           */
          timeout         = function timeoutPromise(error) {
            return $Q(function(resolve, reject) {
              setTimeout(function() {

                $rootScope.$apply(function() {
                  reject(error);
                });
              }, settings.timeoutInterval);
            });
          },
          /**
           * A naive implementation of Promise.race.
           * see
           * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race}
           * for details.
           * @param {Array<Promise>} promises - array of promises
           * @returns {Promise} - promise, gets resolved or rejected as soon as any promise fulfills/rejects.
           * @private
           */
          race            = function race(promises) {
            return $Q(function(resolve, reject) {
              angular.forEach(promises, function(promise) {
                promise.then(resolve, reject);
              });
            });
          },
          /**
           * Creates an `Autorejected Deferred` object which represents a task which will finish in the future.
           * if task is not completed after a specified amount of time it will automatically be rejected.
           * @returns {Deferred} Returns a new instance of deferred.
           */
          autorejectDefer = function autorejectDefer() {

            if (!settings.enable) return $Q.defer();

            var dfd = $Q.defer(),
                timeoutError = new Error('Promise has been rejected due to a timeout.');

            // reason not to have a custom Error class
            // is that it seems to be impossible to get
            // the same formatting in developer console as Error type has.
            // so in case of custom Error class we will not get
            // pretty stack trace formatting with collapse/expand feature
            // (at least in Chrome browser).
            timeoutError.$$timeoutSignal = true;

            race([dfd.promise, timeout(timeoutError)])
            // specification allows multiple resolve calls on the same defer
            // only first will matter, all other will simply be ignored.
              .then(dfd.resolve, function(reason) {

                if (reason === timeoutError && settings.logTimeouts) {
                  $log.error(reason);
                }

                dfd.reject(reason);
              });

            return dfd;
          };

      // service implementation
      var $service = function $service(resolver) {

        if (!settings.enable) return $Q(resolver);

        var dfd = autorejectDefer();

        resolver(dfd.resolve, dfd.reject);

        return dfd.promise;
      };

      // copying all methods from original $q service.
      angular.forEach($delegate, function(method, name) {
        $service[name] = method;
      });

      $service.defer = autorejectDefer;

      return $service;
    }

    /**
     * Configures this provider.
     * @param {Object} config - configuration settings.
     * @param {Number} config.timeoutInterval - Specifies an amount of time in milliseconds to wait,
     * until promise will be automatically rejected.
     * @param {Boolean} config.logTimeouts - indicates whether rejections by timeout should be
     * written to $log service or not.
     * @param {Boolean} config.enable - If set to false, this provider will not add timeout functionality
     * to $q service. It is recommended to enable this provider for debug purposes only.
     */
    this.config = function(config) {
      settings = angular.extend({}, settings, config);
    };


    this.$get = function $get() {

      return {
        /**
         * Checks whether an error, specified by the parameter,
         * is a timeout rejection error.
         * @param {Error} error - error to check.
         * @returns {Boolean} If true - error is timeout error,
         * otherwise false.
         * @example
         * var p = $q(resolver)
         * .catch(function(reason) {
         *   if (autoreject.isTimeoutError(reason)) {
         *     // handle timeout errors here.
         *   }
         * });
         */
        isTimeoutError: function isTimeoutError(error) {
          return error && error.$$timeoutSignal || false;
        }
      }
    };

    $provide.decorator('$q', timeoutQDecorator);
  }

  angular
    .module('angular-autoreject-promises', [])
    .provider('autoreject', autorejectProvider);

})(window.angular);
