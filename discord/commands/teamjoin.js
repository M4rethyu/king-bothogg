exports.run = async (client, message, arguments, options, permission) => {
	var msg;
	if (!client.teamsort.list) {
		msg = "No teams are currently being formed";
	} else {
		list = client.teamsort.list;
		total = client.teamsort.teams*client.teamsort.players;
		var id = message.author.id;
		//var id = arguments._rest;
		var msg;
		if (list.length > total) msg = "There are too many people in the list. This should never happen, but it seems like it did."
		if (list.length == total) msg = "There are already " + total + " people in the list"
		if (list.length < total) {
			if (list.includes(id)) {
				msg = "You are already on the list, " + message.author + " " + "<:bothogg:630810684648587295>";
			} else {
				list.push(id);
				msg = "You have been added to the list, " + message.author + " " + "<:bothogg:630810684648587295>";
			}
		}
		client.teamsort.list = list;
	}
	message.channel.send(msg);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 5,
	"syntax" : [
		
	],
	"usage" : [
		
	],
	"channels" : "spam",
	"help" : "Join a list which will be sorted into teams"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "teamjoin") return true;
	return false;
}; {}