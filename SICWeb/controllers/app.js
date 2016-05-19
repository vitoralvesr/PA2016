angular.module('SICWeb', ['angucomplete'])
.controller('SICWebController', function($scope, $http, $document) {
    $scope.formulario = novo_formulario();
    
    $scope.buscaAlunos = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/aluno/ConsultarAluno/";

        $http.get(url)
        .then(function(response) {
            $scope.listaAlunos = response.data;
            console.log('success');
        }, function(response) {
            console.log(response);
        });
    }

    $scope.buscaTiposNotificacao = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/tipoNotificacao/ConsultarTipoNotificacao/";

        $http.get(url)
        .then(function(response) {
            $scope.listaTipoNotificacoes = response.data;
        },function(response) {
            console.log(response);
        });
    }

    $scope.limparFormulario = function () {
        $scope.formulario = novo_formulario();
    }

    $scope.enviarNotificacao = function () {
        // send notification
    }

    $scope.abrirModal = function (not) {
        $scope.notification = not;
        $('#modal_notification').modal();
    }

    $document.ready(function(){
        $scope.buscaAlunos();
        $scope.buscaTiposNotificacao();
        // $scope.buscaNotificacoes();
    });
});

function novo_formulario () {
    return {
        Aluno: null,
        IdTipoNotificacao: null
    };
}

function nova_pesquisa () {
    return {
        Aluno: null
    };
}