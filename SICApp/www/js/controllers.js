angular.module('starter.controllers', [])

.controller('ProfessorCtrl', function($scope) {
  $scope.listaTurmas = [{
    Codigo : 1,
    Identificador : '8 A',
    Turno : 'M'
  },{
    Codigo : 2,
    Identificador : '8 B',
    Turno : 'M'
  }];

  $scope.listaHorarios = ['Matematica - 1', 'Matematica - 2', 'Portugues - 3', 'Física - 4'];

  $scope.listaAlunos = [{
    RegistroAcademico : 31223440,
    Nome : 'Vitor Alves Rocha',
    Presente : true,
    CodInstituicao : 1
  },{
    RegistroAcademico : 31223441,
    Nome : 'Daniela Freire Marinho',
    Presente : true,
    CodInstituicao : 1
  }];
})

// .controller('ChatsCtrl', function($scope, Chats) {
//   // With the new view caching in Ionic, Controllers are only called
//   // when they are recreated or on app start, instead of every page change.
//   // To listen for when this page is active (for example, to refresh data),
//   // listen for the $ionicView.enter event:
//   //
//   //$scope.$on('$ionicView.enter', function(e) {
//   //});

//   $scope.chats = Chats.all();
//   $scope.remove = function(chat) {
//     Chats.remove(chat);
//   };
// })

// .controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
//   $scope.chat = Chats.get($stateParams.chatId);
// })

.controller('ResponsavelCtrl', function($scope) {
  $scope.listaFilhos = [{
    Nome : 'Vitor Alves Rocha',
    RegistroAcademico : 31223440,
    Instituicao : {
      Codigo : 1,
      RazaoSocial : 'Instituto de Educação de Minas Gerais',
      CNPJ : '1231231231/123',
      Sigla : 'IEMG'
    },
    Turma : {
      Identificador : '8 B',
      Disciplina : {
        Horario : 1
      }
    }
  },{
    Nome : 'Daniela Freire Marinho',
    RegistroAcademico : 31223441,
    Instituicao : {
      Codigo : 2,
      RazaoSocial : 'Centro Universitário UNA',
      CNPJ : '1231231231/321',
      Sigla : 'UNA'
    },
    Turma : {
      Identificador : '8 A',
      Disciplina : {
        Horario : 2
      }
    }
  }];

  $scope.numFilhos = $scope.listaFilhos.length;
});
