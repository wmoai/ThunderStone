var express = require('express');

var app = express.createServer();

// Configuration

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.static(__dirname + '/public'));


// Routes

app.get('/now', function(req, res){
    res.render('index', {locals: {
        title: 'NowJS + Express Example'
    }});
});

app.get('/now/chat', function(req, res){
    res.render('chat', {locals: {
        title: 'NowJS + Express Example'
    }});
});

app.listen(8080);
console.log("Express server listening on port %d", app.address().port);


// NowJS component
var nowjs = require("now");
var everyone = nowjs.initialize(app);


nowjs.on('connect', function(){
    console.log("Joined: " + this.now.name);
    this.now.isPlayer = false;
    var names = {};
    for (var key in nowjs.users) {
        names[key] = nowjs.users[key].now.name;
    }
    everyone.now.userList(names);

    names = {};
    for (var key in nowjs.users) {
        if (!nowjs.users[key].now.isPlayer) {
            continue;
        }
        names[key] = nowjs.users[key].now.name;
    }
    everyone.now.playerList(names);
});


nowjs.on('disconnect', function(){
    console.log("Left: " + this.now.name);
    var names = {};
    for (var key in nowjs.users) {
        if (this.now == nowjs.users[key].now) {
            continue;
        }
        names[key] = nowjs.users[key].now.name;
    }
    everyone.now.userList(names);
});

everyone.now.distributeMessage = function(message){
    everyone.now.receiveMessage(this.now.name, message);
};

var sequenceList = {};

everyone.now.joinGame = function() {
    this.now.isPlayer = true;
    var names = {};
    var count = 0;
    for (var key in nowjs.users) {
        if (!nowjs.users[key].now.isPlayer) {
            continue;
        }
        names[key] = nowjs.users[key].now.name;
        count++;
    }
    sequenceList[count] = this.user.clientId;
    this.now.sequence = count;
    everyone.now.playerList(names);
};

everyone.now.command = function() {
    var nextSeq = this.now.sequence + 1;
    if (!sequenceList[nextSeq]) {
        nextSeq = 1;
    }
    nowjs.users[sequenceList[nextSeq]].now.hello();
};





