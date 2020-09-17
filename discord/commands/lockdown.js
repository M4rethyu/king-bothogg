exports.run = async (client, message, arguments, options, permission) => {

	let status = client.discord.lockdown;
	let raiderRole = client.discord.raiderRole();

	let keyword;
	if (arguments.keyword === null) {
		// Toggle status between on/off
		if (status) {
			keyword = "off";
		} else {
			keyword = "on";
		}
	} else {
		keyword = arguments.keyword;
	}

	let raiders;
	let raider;
	switch(keyword) {
		case "on":
			client.discord.lockdown = true;
			message.channel.send("Lockdown is now on.");
			break;
		case "off":
			client.discord.lockdown = false;
			message.channel.send("Lockdown is now off.");
			break;
		case "status":
			if (status) {
				message.channel.send("Lockdown is currently on.");
			} else {
				message.channel.send("Lockdown is currently off.");
			}
			break;
		case "list":
			raiders = message.guild.members.filter(member => (member.roles.has(raiderRole.id)));
			let s = []
			for (raider of raiders) {
				raider = raider[1];
				s.push(raider.toString())
			}
			message.channel.send("Listing everyone with "+raiderRole+":\n"+s.join(", "));
			break;
		case "clear":
			raiders = message.guild.members.filter(member => (member.roles.has(raiderRole.id)));
			for (raider of raiders) {
				raider = raider[1];
				await raider.removeRole(raiderRole.id);
			}
			message.channel.send("Cleared "+raiderRole+" from everyone");
			break;
		case "kick":
		case "ban":
			let errorCounter = 0
			raiders = message.guild.members.filter(member => (member.roles.has(raiderRole.id)));
			for (raider of raiders) {
				raider = raider[1];
				if (raider.bannable) {
					if (keyword === "kick") {
						await raider.kick();
					} else { // keyword === "ban"
						await raider.ban();
					}
				} else {
					if (errorCounter < 3) {
						message.channel.send("Lacking permission to kick/ban "+raider);
					} else if (errorCounter === 3) {
						message.channel.send("Suppressing further errors with banning/kicking");
					}
				}
			}
			if (keyword === "kick") {
				message.channel.send("Kicked everyone with "+raiderRole);
			} else { // keyword === "ban"
				message.channel.send("Banned everyone with "+raiderRole);
			}
			break;
		default:
			message.channel.send("'"+keyword+"' is an invald keyword. use on/off/status/list/clear/kick/ban");
	}

	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : false,
	"permission" : 3,
	"syntax" : [
		"keyword_w"
	],
	"usage" : [
		"on/off/status/list/clear/kick/ban"
	],
	"channels" : "spam",
	"help" : "A tool to prevent raids"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "lockdown") return true;
	return false;
};