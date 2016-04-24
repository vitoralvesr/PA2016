angular.module('starter.controllers', [])

.controller('ListaCtrl', function($scope, $ionicModal) {
    $scope.filtersShowing = false;

    $scope.listaFilhos = [{
        id : 1,
        nome : 'Vitor Alves Rocha'
    },{
        id : 2,
        nome : 'Priscilla Alves Rocha'
    }];

    $scope.listaNotificacoes = [{
        id : 1,
        data : '23/04/2016',
        tipo : {
            id : 1,
            descricao : 'Ocorrência'
        },
        mensagem : 'Bacon ipsum dolor amet filet mignon chuck ground round andouille tri-tip brisket. Pancetta capicola prosciutto shank. Hamburger alcatra cow ham hock kielbasa capicola. Bacon turkey pork loin hamburger. Picanha sausage drumstick meatball biltong. Flank pancetta beef tri-tip doner jowl shank.',
        ciente : false
    },{
        id : 2,
        data : '23/04/2016',
        tipo : {
            id : 2,
            descricao : 'Evento escolar'
        },
        mensagem : 'Bacon ipsum dolor amet filet mignon chuck ground round andouille tri-tip brisket. Pancetta capicola prosciutto shank. Hamburger alcatra cow ham hock kielbasa capicola. Bacon turkey pork loin hamburger. Picanha sausage drumstick meatball biltong. Flank pancetta beef tri-tip doner jowl shank.',
        ciente : true
    }];

    $scope.showFilters = function (arg) {
        $scope.filtersShowing = !arg;
    };

    $ionicModal.fromTemplateUrl('templates/modal.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.modal = modal;
    });

    $scope.showModal = function (arg) {
        $scope.notSelect = arg;
        $scope.modal.show();
    }
})

.controller('ResponsavelCtrl', function($scope) {

});
