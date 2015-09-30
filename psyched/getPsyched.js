request = require('request-json');
var client = request.createClient('http://textbelt.com/text');
 
var CODY_NUMBER = '4077165260';
var JM_NUMBER = '3863154834';
var JOSH_NUMBER = '4073126264';

var Profile = function (name, number, messages) {
	this.i = 0;
	this.name = name;
	this.number = number;
	this.messages = messages;
};

var profiles = [
	new Profile("Cody", CODY_NUMBER, [
		"Kill it man!",
		"Prime Time Climb Time"
	]),
	
	
	new Profile("JM", JM_NUMBER, [
		"Get PsychedSon!",
		"Never Give Up",
		"The world is your oyster",
		"Wake up, and get swole",
		"Prime Time Climb Time",
		"You can do anything",
		"Just try a little harder next time, and you will progressive fast"
	]),
	new Profile("Josh", JOSH_NUMBER, [
		"You feeling hungry, go climb some rocks!",
		"There are some donuts waiting for you at the gym, come get them, and climb",
		"Prime Time Climb Time"
	])
];

var sendMessage = function () {
	for (var i = 0; i < profiles.length; i++) {
		var profile = profiles[i];
		var messageToSend = profile.messages[profile.i];
		profile.i = (profile.i + 1) % profile.messages.length;
		
		var dataToSend = {
			number: profile.number,
			message: profile.message
		};
		
		console.log("sent '" + messageToSend + "' to " + profile.name)
		client.post('', dataToSend, function(err, res, body) {
		
		});
	}
}

setInterval(sendMessage, 1 * 60 * 60000);
sendMessage();
