angular.module('tradity').
  controller('RegistrationCtrl', function($scope, $stateParams, $location, socket) {
    $scope.school = $stateParams.schoolid;
    //$scope.schoolname = document.getElementById('schoolname').value = '';
    $scope.traderse = 0;
    $scope.tradersp = 0;
    $scope.traditye = 0;
    $scope.wot = 0;
    $scope.zipcode = '';
    $scope.town = '';
    $scope.street = '';
    $scope.invitekey = $stateParams.inviteCode;
    socket.on('register', function(data) {
      switch (data.code) {
        case 'reg-success':
          alert('Registrierung erfolgreich');
          showLogin();
          break;
        case 'reg-email-failed':
          alert('Aktivierungsmail konnte nicht versandt werden. Bitte an tech@tradity.de wenden');
          break;
        case 'reg-email-sending':
          alert('Aktivierungsmail wird versandt');
          break;
        case 'reg-email-already-present':
          alert('Email bereits vorhanden');
          break;
        case 'reg-name-already-present':
          alert('Benutzername bereits vergeben');
          break;
        case 'reg-unknown-school':
          alert('Unbekannte Schule');
          break;
        case 'reg-too-short-pw':
          alert('Das Passwort ist zu kurz');
          break;
        case 'reg-beta-necessary':
          alert('Beta-Schlüssel ungültig oder nicht angegeben');
          break;
        case 'reg-name-invalid-char':
          alert('Der Benutzername enthält unerlaubte Zeichen');
          break;
      }
    });
    $scope.register = function() {
      if (!$scope.agbread)
        return alert('Bitte bestätige, dass du die AGB gelesen hast.');
      socket.emit('register', {
        name: $scope.name,
        giv_name: $scope.giv_name,
        fam_name: $scope.fam_name,
        realnamepublish: $scope.realnamepublish,
        password: $scope.password,
        email: $scope.email,
        gender: $scope.gender,
        school: $scope.school,
        betakey: $scope.betakey,
        street: $scope.street,
        zipcode: $scope.zipcode,
        town: $scope.town,
        traderse: $scope.traderse,
        tradersp: $scope.tradersp,
        traditye: $scope.traditye,
        wot: $scope.wot,
        invitekey: $scope.invitekey
      });
    };
    //useSchoolAC($scope, socket); 
  });
