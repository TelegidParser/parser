var channels = require('../channels');
var S = require('string');
var _ = require('lodash');
var fs = require('fs');
module.exports = function (socket) {
    _.each(channels, function (element, index) {
        var filename = element.alias + '.txt';
        fs.exists('./data/in/' + filename, function (exists) {
            channels[index].exists = exists;
        })

    });
    socket.emit('init', {
        channels: channels
    });

    socket.on('disconnect', function () {
        socket.broadcast.emit('user:left', {
            name: '1'
        });
    });
    socket.on('channel:process', function (data) {
        console.log('channel:process: ' + data.alias);
        var corrections_list = loadCorrectionsLists(data.alias);
        fs.readFile('./data/in/' + data.alias + '.txt', {encoding: 'utf-8'}, function (err, content) {
            if (err) throw err;
            content = content.replace(/\r\n/g, '\n');
            var lines = content.split('\n');
            var updated = [];
            _.each(lines, function (element, index, list) {
                element = element.replace(/^\s*(\d)[:.](\d\d)/g, '0$1.$2');
                var time_pattern = /^\s*(\d\d)[.:](\d\d)\s*(.*)\s*$/g;
                var day_pattern = /^\s*(ПОНЕДЕЛЬНИК|ВТОРНИК|СРЕДА|ЧЕТВЕРГ|ПЯТНИЦА|СУББОТА|ВОСКРЕСЕНЬЕ|Понедельник|Вторник|Среда|Четверг|Пятница|Суббота|Воскресенье).*$/g;
                var age_pattern = /\[?\(?(0|6|12|16|18)\s*\+\)?\]?/g;
                var match_programme = time_pattern.exec(element);
                var match_day = day_pattern.exec(element);
                if (match_programme && match_programme[3].length > 2) {
                    var match_age = age_pattern.exec(match_programme[3]);
                    var programme = {
                        type: 'programme',
                        time: match_programme[1] + '.' + match_programme[2],
                        string: match_programme[3]
                    };
                    if (match_age) {
                        programme.age = match_age[1];
                        programme.string = programme.string.replace(match_age[1] + '+', '');
                        programme.string = programme.string.replace(' []', '');
                    }
                    updated.push(programme);
                }
                else if (match_day) {
                    updated.push({type: 'day', string: S(match_day[1]).capitalize().s});
                }
            });
            _.each(updated, function (programme, index, list) {
                if (programme.type == "programme") {
                    _.each(corrections_list, function (change_pair, index, list) {
                        var change_pattern = new RegExp(change_pair.change, "g");
                        programme.string = programme.string.replace(change_pattern, change_pair.to);
                    });
                    programme.string += '.';
                    programme.string = programme.string.replace(/\s*\.*$/g, '.');
                    programme.string = programme.string.replace(/\s*\(\s*\)/g, '');
                    programme.string = programme.string.replace(/\.+/g, '.');
                    programme.string = programme.string.replace(/\s*"\./g, '".');
                    programme.string = programme.string.replace(/([!?])\s*(")?\./g, '$1$2');
                    programme.string = programme.string.replace(/\."/g, '"');
                }
            });
            fs.writeFile('./data/json/' + data.alias + '.json', JSON.stringify(updated, null, 4), function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to ");
                }
            });
            var full_programme = '';
            _.each(updated, function (programme, index, list) {
                if (programme.type == 'day') {
                    full_programme += programme.string + '\n';
                }
                else {
                    if (programme.age != undefined) {
                        full_programme += programme.time + ' ' + programme.string + ' [' + programme.age + '+]\n';
                    }
                    else {
                        full_programme += programme.time + ' ' + programme.string + '\n';
                    }
                }
            });

            fs.writeFile('./data/txt/' + data.alias + '.txt', full_programme, function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("JSON saved to ");
                }
            });

            socket.emit('channel:processed', {
                content: updated
            });
        });

    });

};

function loadCorrectionsLists(alias) {
    var lists;
    var full_list = [];
    var list_content = '';
    _.each(channels, function (element, index) {
        if (element.alias == alias) {
            lists = element.lists;
        }
    });
    _.each(lists, function (element, index) {
        if (fs.existsSync('./lists/' + element + '.txt')) {
            list_content += fs.readFileSync('./lists/' + element + '.txt', {encoding: 'utf-8'});
        }

    });
    list_content = list_content.replace(/\r/g, '');
    var lines = list_content.split('\n');

    _.each(lines, function (element, index) {
        var pair = element.split('~');
        full_list.push({change: pair[0], to: pair[1]});
    });
    console.log(full_list);
    return full_list;
}