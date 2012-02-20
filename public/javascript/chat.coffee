$ ->
  now.receiveMessage = (name, message) -> $("#messages").append "<br>" + name + ": " + message
  now.userList = (names) ->
    $("#userList").empty()
    ($("#userList").append "<br>" + names[key]) for key of names
  now.playerList = (names) ->
    $("#playerList").empty()
    ($("#playerList").append "<br>" + names[key]) for key of names
  now.hello = ->
    alert "your turn!"
    now.command()
  $("#send-button").click ->
    now.distributeMessage($("#text-input").val())
    $("#text-input").val ""
    $("#text-input").focus()
  $("#join_game").click ->
    now.joinGame()
  $("#start_game").click ->
    now.command()
  now.name = prompt "What's your name?", ""

