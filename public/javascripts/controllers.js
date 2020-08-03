function AppCtrl($scope, socket) {
  socket.on('init', function (data) {
    $scope.channels = data.channels;
    console.log('init');
  });
  socket.on('connection', function (data) {
    console.log('connected');
  });
  socket.on('file:added', function (data) {
      console.log('file:added: ' + data.filename);
      var alias = data.filename.replace('.txt', '');
      for (var i = 0; i < $scope.channels.length; i++) {
        if (alias == $scope.channels[i].alias) {
          $scope.channels[i].exists = true;
        }
      }
    }
  );
  socket.on('file:removed', function (data) {
    console.log('file:removed: ' + data.filename);
    var alias = data.filename.replace('.txt', '');
    for (var i = 0; i < $scope.channels.length; i++) {
      if (alias == $scope.channels[i].alias) {
        $scope.channels[i].exists = false;
      }
    }

  });
  socket.on('channel:processed', function (data) {
    $scope.currentContent = data.content;

  });
  $scope.sendMessage = function () {
    socket.emit('send:message', {
      message: $scope.message
    });
    $scope.messages.push({
      user: $scope.name,
      text: $scope.message
    });
  };

  $scope.processChannel = function (alias) {
    socket.emit('channel:process', {
      alias: alias
    });
  };

}