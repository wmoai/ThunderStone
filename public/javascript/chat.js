(function() {

  $(function() {
    now.receiveMessage = function(name, message) {
      return $("#messages").append("<br>" + name + ": " + message);
    };
    now.userList = function(names) {
      var key, _results;
      $("#userList").empty();
      _results = [];
      for (key in names) {
        _results.push($("#userList").append("<br>" + names[key]));
      }
      return _results;
    };
    now.playerList = function(names) {
      var key, _results;
      $("#playerList").empty();
      _results = [];
      for (key in names) {
        _results.push($("#playerList").append("<br>" + names[key]));
      }
      return _results;
    };
    now.hello = function() {
      alert("your turn!");
      return now.command();
    };
    $("#send-button").click(function() {
      now.distributeMessage($("#text-input").val());
      $("#text-input").val("");
      return $("#text-input").focus();
    });
    $("#join_game").click(function() {
      return now.joinGame();
    });
    $("#start_game").click(function() {
      return now.command();
    });
    return now.name = prompt("What's your name?", "");
  });

}).call(this);
