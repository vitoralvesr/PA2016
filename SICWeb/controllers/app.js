angular.module('SICWeb', [])
.controller('SICWebController', function($scope) {
    $scope.items = [{
        id: 1,
        label: 'Motivo 1',
        subItem: { name: 'Motivo 1' }
    }, {
        id: 2,
        label: 'Motivo 2',
        subItem: { name: 'Motivo 2' }
    }];

    $scope.notifications = [{
        id: 1,
        student: 'Aluno 1',
        message: 'Mensagem 1',
        date: '06/05/2016',
        title: 'Teste 1',
        reason: 1,
        aware: true,
        answer: null
    }, {
        id: 2,
        student: 'Aluno 2',
        message: 'Mensagem 2',
        date: '06/05/2016',
        title: 'Teste 2',
        reason: 2,
        aware: false,
        answer: 'Resposta 2'
    }];

    $scope.clearForm = function () {
        // reset form
    }

    $scope.sendNotification = function () {
        // send notification
    }

    $scope.openModal = function (not) {
        $scope.notification = not;
        $('#modal_notification').modal();
    }
});