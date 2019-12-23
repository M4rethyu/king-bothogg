exports.run = async (client, message, arguments, options, permission) => {
	teams = arguments.teams
	players = arguments.players
	if (client.teamsort.list) {
		msg = "Teams are already being formed. Use !teamstop to cancel it";
	} else {
		client.teamsort.list = [];
		client.teamsort.teams = teams;
		client.teamsort.players = players;
		msg = "Forming " + teams + " teams with " + players + " players each, for a total of " + teams*players + " players. Join the list with !teamjoin";
	}
	message.channel.send(msg);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 3,
	"syntax" : [
		"teams_n:4 players_n:8"
	],
	"usage" : [
		
	],
	"channels" : "spam",
	"help" : "Join a list which will be sorted into teams"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "teammake") return true;
	return false;
};