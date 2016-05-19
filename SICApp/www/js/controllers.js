angular.module('starter.controllers', [])
.controller('ListaCtrl', function($scope, $http, $document, $ionicModal) {
    //VAI VIR DO LOGIN
    $scope.IdResponsavel = 3;

    $scope.filtros = {};
    $scope.respostaNotificacao = nova_reposta();

    $scope.mensagemListaVazia = 'Nenhum registro foi encontrado';

    $scope.onezoneDatepicker = {
        date: new Date(), // MANDATORY
        mondayFirst: false,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'JUlho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        daysOfTheWeek: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        showTodayButton: true,
        callback: function(value){
            // $scope.filtros.dtInicial = value.toString();
            // $scope.aplicarFiltros();
        }
    };

    $scope.aplicarFiltros = function () {
        $scope.buscaNotificacoes(montarParametros($scope.filtros));
    }

    $scope.buscaTiposNotificacao = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/tipoNotificacao/ConsultarTipoNotificacao/";

        $http.get(url)
        .then(function(response) {
            $scope.listaTipoNotificacoes = response.data;
            console.log(angular.toJson($scope.listaTipoNotificacoes));
        },function(response) {
            console.log(response);
        });
    }

    $scope.buscaAlunos = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/aluno/ConsultarAluno/";

        $http({
            url: url,
            method: "GET",
            params: {idResponsavel: $scope.IdResponsavel}
        }).then(function(response) {
            $scope.listaAlunos = response.data;
            console.log(angular.toJson($scope.listaAlunos));
        },function(response) {
            console.log(response);
        });
    }

    $scope.buscaNotificacoes = function (parametros) {
        var url = "http://notificandoapp.azurewebsites.net/api/notificacao/ConsultarNotificacao/";
        if (parametros !== '?') {
            url += parametros;
        }

        console.log(url);

        $http.get(url)
        .then(function(response) {
            $scope.listaNotificacoes = response.data;
            console.log(angular.toJson($scope.listaNotificacoes));
        },function(response) {
            console.log(response);
        });
    }

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
    }

    $scope.showModalObs = function () {
        setTimeout(function () {
            $scope.modalObs.show();
        }, 500);
    }

    $scope.enviarReposta = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/notificacao/ResponderNotificacao/";

        $http.post(url, $scope.respostaNotificacao)
        .then(function(response) {
            console.log('Sucesso');
            console.log(angular.toJson(response));
        }, function(response) {
            console.log('Erro');
            console.log(response);
        });

        $scope.modalObs.hide();
        $scope.modal.hide();
        $scope.respostaNotificacao = nova_reposta();
        $scope.aplicarFiltros();
    }
})

.controller('ResponsavelCtrl', function($scope) {

});

function nova_reposta () {
    return {
        IdNotificacao: null,
        ResponsavelCiente: false,
        RespostaNotificacao: null,
        IdNotificacaoRespostaPai: null
    };
}