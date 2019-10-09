exports.run = async (client, message, permission, command, args, content) => {
	
	const rn = Math.random();
	
	var type;
	if (rn <= 0.4) {
		type = "no";
	} else if (rn <= 0.6) {
		type = "maybe";
	} else if (rn <= 1.0) {
		type = "yes";
	}
	
	const answers = client.answers.commands.ask[type]
	const answer = answers[Math.floor(Math.random()*answers.length)];
	if (message.guild) {
		const owner = client.discord.users.find(u => u.id == client.discord.config.owner[0])
		owner.send(
			message.author + " asked '" + message.content + "' in #" + message.channel.name + ". answer was '" + answer + "'.\n" +
			"https://discordapp.com/channels/" + message.guild.id + 
			"/" + message.channel.id +
			"/" + message.id
		);
	}
	
	message.channel.send(answer);
	return;
};

exports.config = {
	"cooldown" : 10,
	"sharedCooldown" : true,
	"permission" : 5
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "ask") return true;
	return false;
};

exports.help = "A template for commands, so I can just copy paste"