'use strict';

angular.module('starter.controllers', [])
.controller('ListaCtrl', function($scope, $http, $document, $window, $ionicModal, $httpFunctions, $format, $timeout, $cordovaLocalNotification) {
    //VAI VIR DO LOGIN
    $scope.IdResponsavel = 1;

    $scope.filtros = {};
    $scope.respostaNotificacao = nova_reposta();

    $scope.mensagemListaVazia = 'Nenhuma notificação foi encontrada!';

    $scope.dtInicial = {
        date: new Date(), // MANDATORY
        mondayFirst: false,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        daysOfTheWeek: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        showTodayButton: true,
        callback: function(value){
            $format.formatDate(value, function (val) {
                $scope.filtros.dtInicial = val;
            });

            $scope.aplicarFiltros();
        }
    };

    $scope.dtFinal = {
        date: new Date(), // MANDATORY
        mondayFirst: false,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        daysOfTheWeek: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        showTodayButton: true,
        callback: function(value){
            $format.formatDate(value, function (val) {
                $scope.filtros.dtFinal = val;
            });

            $scope.aplicarFiltros();
        }
    };

    $scope.aplicarFiltros = function () {
        console.log(angular.toJson($format.parameters($scope.filtros)));
        $scope.buscaNotificacoes($format.parameters($scope.filtros));
    };

    $scope.buscaTiposNotificacao = function () {
        var url = "http://notificando.azurewebsites.net/api/tipoNotificacao/ConsultarTipoNotificacao/";

        $httpFunctions.get(url, {},
            function (response) {
                $scope.listaTipoNotificacoes = response.data;
            },
            function (error) {
                console.log(error);
            }
        );
    };

    $scope.buscaAlunos = function () {
        var url = "http://notificando.azurewebsites.net/api/aluno/ConsultarAluno/";
        var params = {
            idResponsavel: $scope.IdResponsavel
        };

        $httpFunctions.get(url, params,
            function (response) {
                $scope.listaAlunos = response.data
            },
            function (error) {
                console.log(error);
            }
        );
    };

    $scope.buscaNotificacoes = function (params) {
        var url = "http://notificando.azurewebsites.net/api/notificacao/ConsultarNotificacao/";

        $httpFunctions.get(url, params,
            function (response) {
                $scope.listaNotificacoes = response.data;
            },
            function (error) {
                console.log(error);
            }
        );
    };

    $document.ready(function(){
        $scope.buscaTiposNotificacao();
        $scope.buscaAlunos();
        // $scope.buscaNotificacoes();
    });

    $scope.filtersShowing = false;

    $scope.showFilters = function (arg) {
        $scope.filtersShowing = !arg;
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $ionicModal.fromTemplateUrl('templates/modalObs.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modalObs = modal;
    });

    $scope.abrirNotificacao = function (arg) {
        $scope.notSelect = arg;
        $scope.respostaNotificacao.ResponsavelCiente = $scope.notSelect.ResponsavelCiente;
        $scope.respostaNotificacao.IdNotificacao = $scope.notSelect.IdNotificacao;

        $scope.modal.show();
    };

    $scope.showModalObs = function () {
        setTimeout(function () {
            $scope.modalObs.show();
        }, 500);
    };

    $scope.enviarReposta = function () {
        var url = "http://notificando.azurewebsites.net/api/notificacao/ResponderNotificacao/";

        $httpFunctions.post(url, $scope.respostaNotificacao,
            function (response) {
                console.log(response);

                $scope.modalObs.hide();
                $scope.modal.hide();
                $scope.respostaNotificacao = nova_reposta();

                setTimeout(function () {
                    $scope.aplicarFiltros();
                }, 500);
            },
            function (error) {
                console.log(error);
            }
        );
    }

    $scope.mudaData = function () {
        $format.formatDate($scope.dataBusca, function (val) {
            $scope.filtros.dtInicial = val;
            $scope.aplicarFiltros();
        });
    }

    $scope.startView = function () {
        var dt = new Date();
        $scope.dataBusca = dt;
        $scope.mudaData();
    }
})

.controller('ResponsavelCtrl', function($scope) {

});

function nova_reposta () {
    return {
        IdNotificacao: null,
        ResponsavelCiente: false,
        RespostaNotificacao: null
    };
}