const Discord = require('discord.js');

exports.run = async (client, message, arguments, options, permission) => {
	const channel = message.channel;
	
	var abbrLength = 0;
	var nameLength = 0;
	for (const entry of client.discord.ranks) {
		
		if (entry[0] == "template") continue;
		const rank = entry[1];
		const abbr = rank.abbreviation.length;
		const name = rank.name.length;
		if (abbrLength < abbr) abbrLength = abbr;
		if (nameLength < name) nameLength = name;
	}
	
	var fields = [];
	
	for (var rank of client.discord.ranks) {
		rank = rank[1];
		
		fields.push({
			"name" : "**" + rank.abbreviation + "**" + " | " + rank.name,
			"value" : rank.help
		});
	}
	
	if (fields.length == 0) console.log("there are no commands to display")
	
	message.channel.send({embed: {
		title: "Available ranks:",
		description: "Use the abbreviation, to assign ranks (e.g. \"!rank lol\")",
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
	"cooldown" : 30,
	"sharedCooldown" : true,
	"permission" : 5,
	"syntax" : [
		
	],
	"channels" : "spam",
	"help" : "Show all available ranks"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "ranks") return true;
	return false;
};