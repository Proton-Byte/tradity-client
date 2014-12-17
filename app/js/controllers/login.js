angular.module('tradity').
	controller('LoginCtrl', function($scope, $stateParams, $state, safestorage, socket) {
		$scope.username = '';
		$scope.password = '';
		$scope.stayloggedin = false;

		if ($stateParams.emailVerifCode && $stateParams.uid) {
			socket.emit('emailverif', {
				key: $stateParams.emailVerifCode,
				uid: $stateParams.uid
			}, function(data) {
				switch (data.code) {
					case 'login-success':
						notification('Emailadresse erfolgreich bestätigt', true);
						$scope.fetchSelf();
						$state.go('game.feed');
						break;
					case 'email-verify-already-verified':
						notification('Emailadresse bereits bestätigt');
						break;
					case 'email-verify-other-already-verified':
						notification('Jemand anderes hat diese Emailadresse bereits bestätigt');
						break;
					case 'email-verify-failure':
						notification('Fehler beim Bestätigen der Emailadresse');
						break;
				}
			});
		}
		
		$scope.login = function() {			
			safestorage.setPassword($scope.password);
			socket.emit('login', {
				name: $scope.username,
				pw: $scope.password,
				stayloggedin: $scope.stayloggedin
			}, function(data) {
				switch (data.code) {
					case 'login-success':
						$scope.fetchSelf();
						$state.go('game.feed');
						break;
					case 'login-badname':
						notification('Benutzer „' + $scope.username + '“ existiert nicht');
						break;
					case 'login-wrongpw':
						notification('Falsches Passwort');
						break;
					case 'login-email-not-verified':
						notification('Emailadresse noch nicht bestätigt');
						break;
				}
			});
		};

		socket.on('password-reset', function(data) {
			if (data.code == 'password-reset-success') {
				notification('Neues Passwort erfolgreich versandt',true);
			} else if (data.code == 'password-reset-failed') {
				notification('Das neue Passwort konnte nicht versandt werden. Bitte an tech@tradity.de wenden');
			} else if (data.code == 'password-reset-notfound') {
				notification('Benutzer „' + $scope.username + '“ existiert nicht');
			}
		});

		$scope.passwordReset = function() {
			socket.emit('password-reset', {
				name: $scope.username
			});
		};
	});
