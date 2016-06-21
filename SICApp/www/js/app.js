
// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova', 'starter.controllers', 'starter.services', 'starter.directives', 'onezone-datepicker'])

.run(function($ionicPlatform, $rootScope, $timeout, $httpFunctions, $format, $cordovaLocalNotification) {
  $ionicPlatform.ready(function() {
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }

        var url = '';

        setInterval(function () {
          url = "http://notificando.azurewebsites.net/api/notificacao/ConsultarNotificacaoNaoEnviada/";
          $httpFunctions.get(url, $format.parameters({idResponsavel : 1}),
              function (response) {
                  not = response.data;

                  if (not !== undefined && not !== null) {
                    $cordovaLocalNotification.isScheduled(not.IdNotificacao).then(function(isScheduled) {
                        if (!isScheduled) {
                          var storage = window.localStorage;
                          var value = storage.getItem(not.IdNotificacao);

                          if (value === undefined || value === null) {
                            storage.setItem(not.IdNotificacao, true);
                            var alarmTime = new Date();
                            alarmTime.setMinutes(alarmTime.getMinutes() + 0.1);
                            $cordovaLocalNotification.add({
                                id: not.IdNotificacao,
                                date: alarmTime,
                                message: "Nova notificação! Clique para visualizar.",
                                title: "Notificando",
                                autoCancel: true,
                                data: not
                            }).then(function () {
                                url = "http://notificando.azurewebsites.net/api/notificacao/RegistrarEnvioNotificacao/";

                                $httpFunctions.post(url, { idNotificacao : not.IdNotificacao},
                                    function (response) {
                                    },
                                    function (error) {
                                      console.log(angular.toJson(error));
                                    }
                                );
                            });
                          }
                        }
                    });
                  }
              },
              function (error) {
                  console.log(angular.toJson(error));
              }
          );
        }, 5000);

        cordova.plugins.notification.local.on("click", function (notification, state) {
            angular.element(document.getElementById('ctrl-lista')).scope().abrirNotificacao(angular.fromJson(notification.data));
        }, this);
    });
})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
    .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: function(){
      if (ionic.Platform.isAndroid()) {
            return  'views/tabs-android.html';
        }
        return 'views/tabs-ios.html';
      }
  })

  // Each tab has its own nav history stack:

  .state('tab.lista', {
    url: '/lista',
    views: {
      'tab-lista': {
        templateUrl: 'views/tab-lista.html',
        controller: 'ListaCtrl'
      }
    }
  })

  .state('tab.responsavel', {
    url: '/responsavel',
    views: {
      'tab-responsavel': {
        templateUrl: 'views/tab-responsavel.html',
        controller: 'ResponsavelCtrl'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/tab/lista');
});
