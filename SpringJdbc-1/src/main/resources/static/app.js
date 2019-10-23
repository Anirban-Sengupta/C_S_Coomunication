var stompClient = null;

function setConnected(connected){
	$("#connect").prop("disabled", connected);
	$("#disconnect").prop("disabled", !connected);
	if (connected){
		$("#conversation").show();
	} else {
		$("#conversation").hide();
	}
	$("#greeting").html("");
}

function connect(){
	var socket = new SockJS("/mywebsocket");
	stompClient = Stomp.over(socket);
	stompClient.connect({}, function(frame) {
		setConnected(true);
		Console.log("Connected: " + frame);
		stompClient.subscribe('/topic/higreeting', function (higreeting){
			showGreeting(JSON.parse(higreeting.body).content);
		});
	});
}
function disconnect(){
	if (stompClient !== null){
		stompClient.disconnect();
	}
		setConnected(false);
		console.log("Disconnected");
}
function sendData() {
	var data = JSON.stringify({
		'higreeting' : $("#higreeting").val()
	})
      stompClient.send(data);
}
function sendName(){
stompClient.send("/app/higreeting", {}, JSON.stringify({'name': $("#name").val()}));
}
function showGreeting(message){
	$("#higreeting").append("<tr><td>" + message + "</td></tr>");
}
$(function () {
	$("form").on('submit',function (e){
		e.preventDefault();
	});
	  $("#connect").click(function() { connect(); });
	  $("#disconnect").click(function() { disconnect(); }); 
	  $("#send").click(function() {
			sendData();});
	  $("#send").click(function() { sendName(); });
});