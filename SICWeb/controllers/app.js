angular.module('SICWeb', ['angucomplete-alt', 'cgNotify', 'HttpService', 'FormatService'])
.controller('SICWebController', function($scope, $http, $document, notify, $httpFunctions, $format) {
    $scope.AlunoSelecionado = null;
    $scope.AlunoPesquisa = null;

    $scope.formulario = novo_formulario();
    $scope.pesquisa = nova_pesquisa();
    $scope.notificacoes = [];
    
    $scope.buscaAlunos = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/aluno/ConsultarAluno/";

        $httpFunctions.get(url, {},
            function (response) {
                $scope.listaAlunos = response.data;
            }, function (error) {
                notify({
                    message: 'Erro ao buscar lista de Alunos!',
                    duration: 3000,
                    classes: ['danger-notify'],
                    position: 'left'
                });
            }
        );
    }

    $scope.buscaTiposNotificacao = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/tipoNotificacao/ConsultarTipoNotificacao/";

        $httpFunctions.get(url, {},
            function (response) {
                $scope.listaTipoNotificacoes = response.data;
            }, function (error) {
                notify({
                    message: 'Erro ao buscar lista de Motivos!',
                    duration: 3000,
                    classes: ['danger-notify'],
                    position: 'left'
                });
            }
        );
    }

    $scope.buscaNotificacao = function (param) {
        var url = "http://notificandoapp.azurewebsites.net/api/notificacao/ConsultarNotificacao/";


        $httpFunctions.get(url, param,
            function (response) {
                $scope.notificacoes = response.data;
            }, function (error) {
                notify({
                    message: 'Erro ao buscar lista de Notificações!',
                    duration: 3000,
                    classes: ['danger-notify'],
                    position: 'right'
                });
            }
        );
    }

    $scope.limparFormulario = function () {
        $scope.$broadcast('angucomplete-alt:clearInput', 'aluno');
        $scope.formulario = novo_formulario();
        notify({
            message: 'Formulário limpo com sucesso!',
            duration: 3000,
            classes: ['success-notify'],
            position: 'left'
        });
    }
    $scope.limparPesquisa = function () {
        $scope.$broadcast('angucomplete-alt:clearInput', 'alunoP');

        $('th.clear').click();

        $scope.pesquisa = nova_pesquisa();
        notify({
            message: 'Formulário limpo com sucesso!',
            duration: 3000,
            classes: ['success-notify'],
            position: 'right'
        });
    }

    $scope.filtrarNotificacoes = function () {
        if ($scope.pesquisa.dtInicial !== null) {
            $format.date($scope.pesquisa.dtInicial, 'yyyy-MM-dd', function (res) {
                $scope.pesquisa.dtInicial = res;
            });
        }

        if ($scope.pesquisa.dtFinal !== null) {
            $format.date($scope.pesquisa.dtFinal, 'yyyy-MM-dd', function (res) {
                $scope.pesquisa.dtFinal = res;
            });
        }

        $scope.buscaNotificacao($format.parameters($scope.pesquisa));
    }

    $scope.enviarNotificacao = function () {
        var url = "http://notificandoapp.azurewebsites.net/api/notificacao/EnviarNotificacao/";

        $scope.formulario.IdAluno = $scope.AlunoSelecionado.originalObject.IdAluno;
        $format.date(new Date(), 'yyyy-MM-dd', function (res) {
            $scope.formulario.DataOcorrencia = res;
        });

        $httpFunctions.post(url, $scope.formulario,
            function (response) {
                notify({
                    message: 'Notificacao enviada com sucesso!',
                    duration: 5000,
                    classes: ['success-notify'],
                    position: 'center'
                });

                $scope.limparFormulario();
                $scope.buscaNotificacao();
            }, function (error) {
                notify({
                    message: 'Erro ao enviar notificação. Entre em contato com o suporte!',
                    duration: 5000,
                    classes: ['danger-notify'],
                    position: 'center'
                });
            }
        );
    }

    $scope.selecionarNotificacao = function (not) {
        $scope.notificacao = not;
        $('#modal_notification').modal();
    }

    $document.ready(function(){
        $scope.buscaAlunos();
        $scope.buscaTiposNotificacao();

        $('#inicio').datepicker()
        .on('changeDate', function (e) {
            if (e.dates.length > 0) {
                $scope.pesquisa.dtInicial = e.date;
            }
        });

        $('#fim').datepicker()
        .on('changeDate', function (e) {
            if (e.dates.length > 0) {
                $scope.pesquisa.dtFinal = e.date;
            }
        });
    });
});

function novo_formulario () {
    return {
        IdFuncionarioSolicitante: 1,
        IdFuncionarioCriador: 1,
        IdAluno: null,
        Assunto: null,
        DataOcorrencia: null,
        Descricao: null,
        IdTipoNotificacao: null
    };
}

function nova_pesquisa () {
    return {
        idNotificacao: null,
        dtInicial: null,
        dtFinal: null,
        respCiente: null,
        assunto: null,
        idAluno: null,
        idTipoNotificacao: null
    };
}