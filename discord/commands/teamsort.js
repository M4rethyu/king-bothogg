function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1)); // random index from 0 to i
		// swap elements array[i] and array[j]
		// we use "destructuring assignment" syntax to achieve that
		// you'll find more details about that syntax in later chapters
		let t = array[i]; array[i] = array[j]; array[j] = t;
	}
	return array;
}

exports.run = async (client, message, arguments, options, permission) => {
	var msg;
	if (!client.teamsort.list) {
		msg = "No teams are currently being formed";
	} else {
		list = client.teamsort.list;
		teams = client.teamsort.teams;
		players = client.teamsort.players;
		total = teams*players;
		if (list.length > total) msg = "There are too many people in the list. This should never happen, but it seems like it did."
		else if (list.length < total) msg = "There are not enough people in the list. Please wait for more to join"
		else if (list.length == total) {
			
			console.log(list)
			list = shuffle(list);
			console.log(list)
			
			lists = [];
			for (var i = 0; i < teams; i++) {
				lists[i] = list.slice(i*teams, (i+1)*teams);
			}
			console.log(lists);
			
			fields = [];
			msg = "Teams have been formed";
			for (var team = 0; team < teams; team++) {
				fields.push({
					"name" : "Team " + (team+1),
					"value" : lists[team].map(id => { return client.discord.users.get(id) }).join(", "),
					"inline" : true
				});
				//msg += "\nTeam " + (team+1) + ": " + lists[team];
			}
			
			client.teamsort = {};
		}
		
	}
	
	
	
	
	
	message.channel.send(msg);
	
	message.channel.send({embed: {
		title: "Teams",
		color: 3447003,
		fields: fields,
		timestamp: new Date(),
		footer: {
			icon_url: client.discord.user.avatarURL,
			text: "This is not a cult."
		}
	}
	});
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 3,
	"syntax" : [
		
	],
	"usage" : [
		
	],
	"channels" : "spam",
	"help" : "Join a list and sort that list into teams"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "teamsort") return true;
	return false;
};