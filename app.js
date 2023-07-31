var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var errorHandler = require('error-handler');
var express = require('express');
var routes = require('./routes');
var socket = require('./routes/socket.js');
var http = require('http');
var path = require('path');
var fs = require('fs');
var io = require('socket.io');

var app = express();

// all environments
app.set('port', 4000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');



app.get('/', routes.index);
app.get('/partials/channel-content', routes.channel_content);


app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser());
app.use(methodOverride());
// app.use(errorHandler());


http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
    runFileWatcher();
});

io = io.listen(app.get('port') + 1);
io.sockets.on('connection', socket);

function runFileWatcher() {
    fs.watch('./data', function (event, filename) {
        if (filename && filename.indexOf(".txt") !== -1) {
            fs.exists('./data/' + filename, function (exists) {
                if (exists) {
                    console.log('added: ' + filename);
                    io.sockets.emit('file:added', {filename: filename});
                }
                else {
                    console.log('removed: ' + filename);
                    io.sockets.emit('file:removed', {filename: filename});
                }
            });
        }
    });
}