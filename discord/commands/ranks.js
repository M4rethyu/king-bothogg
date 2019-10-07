exports.run = async (client, message, permission, command, args, content) => {
	const channel = message.channel;
	
	var string = "The available ranks are:```"
	
	var abbrLength = 0;
	var nameLength = 0;
	for (const entry of client.discord.ranks) {
		const rank = entry[1];
		const abbr = rank.abbreviation.length;
		const name = rank.name.length;
		if (abbrLength < abbr) abbrLength = abbr;
		if (nameLength < name) nameLength = name;
	}
	
	for (const entry of client.discord.ranks) {
		const rank = entry[1];
		string += "\n" + rank.abbreviation + " ".repeat(abbrLength - rank.abbreviation.length) + " | ";
		string += rank.name + " ".repeat(nameLength - rank.name.length) + "  ";
		string += "(" + rank.help + ")";
	}
	string += "```";
	
	channel.send(string);
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "ranks") return true;
	return false;
};

exports.help = "Assign ranks to yourself and others (mod)"