angular.module('starter.controllers', [])
.controller('ListaCtrl', function($scope, $ionicModal) {
    $scope.filters = {
        filho: null,
        data: new Date()
    };

    $scope.onezoneDatepicker = {
        date: new Date(), // MANDATORY
        mondayFirst: false,
        months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'JUlho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        daysOfTheWeek: ['Do', 'Se', 'Te', 'Qu', 'Qu', 'Se', 'Sa'],
        showTodayButton: true,
        callback: function(value){
            $scope.filters.data = value;
            $scope.applyFilters();
        }
    };

    $scope.filtersShowing = false;

    $scope.childList = [{
        id : 1,
        nome : 'Vitor Alves Rocha'
    },{
        id : 2,
        nome : 'Priscilla Alves Rocha'
    }];

    $scope.notificationList = [{
        id : 1,
        data : '23/04/2016',
        codigoAluno: 1,
        tipo : {
            id : 1,
            descricao : 'Ocorrência'
        },
        mensagem : 'Bacon ipsum dolor amet filet mignon chuck ground round andouille tri-tip brisket. Pancetta capicola prosciutto shank. Hamburger alcatra cow ham hock kielbasa capicola. Bacon turkey pork loin hamburger. Picanha sausage drumstick meatball biltong. Flank pancetta beef tri-tip doner jowl shank.',
        ciente : false
    },{ 
        id : 2,
        data : '23/04/2016',
        codigoAluno: 2,
        tipo : {
            id : 2,
            descricao : 'Evento escolar'
        },
        mensagem : 'Bacon ipsum dolor amet filet mignon chuck ground round andouille tri-tip brisket. Pancetta capicola prosciutto shank. Hamburger alcatra cow ham hock kielbasa capicola. Bacon turkey pork loin hamburger. Picanha sausage drumstick meatball biltong. Flank pancetta beef tri-tip doner jowl shank.',
        ciente : true
    },{ 
        id : 3,
        data : '23/04/2016',
        codigoAluno: 2,
        tipo : {
            id : 3,
            descricao : 'Agradecimento'
        },
        mensagem : 'Bacon ipsum dolor amet filet mignon chuck ground round andouille tri-tip brisket. Pancetta capicola prosciutto shank. Hamburger alcatra cow ham hock kielbasa capicola. Bacon turkey pork loin hamburger. Picanha sausage drumstick meatball biltong. Flank pancetta beef tri-tip doner jowl shank.',
        ciente : false
    }];

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

    $scope.showModal = function (arg) {
        $scope.notSelect = arg;
        $scope.modal.show();
    }

    $scope.showModalObs = function () {
        $scope.modalObs.show();
    }

    $scope.sendMessage = function () {
        //atualizar notificacao no banco
        $scope.filtersShowing = false;
        $scope.notSelect = null;
        $scope.modalObs.hide();
        $scope.modal.hide();
    }
})

.controller('ResponsavelCtrl', function($scope) {

});
