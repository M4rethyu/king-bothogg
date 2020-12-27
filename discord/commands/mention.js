exports.run = async (client, message, arguments, options, permission) => {
	const channel = message.channel;

	const silent = (options.get("s")?true:false);

	const reactions = (options.get("r")?true:false);

	if (arguments.rank == null) {
		if (!silent) channel.send(message.author + ", please specify a rank");
		return false;
	}

	var abbreviation = arguments.rank.trim();
	abbreviation = abbreviation.toLowerCase();

	var rank;
	for (const entry of client.discord.ranks) {
		if (entry[1].abbreviation == abbreviation) {
			rank = entry[1];
			break;
		}
	}

	if (typeof rank == "undefined") {
		if (!silent) channel.send(message.author + ", this rank doesn't exist");
		return false;
	}

	const role = message.guild.roles.find(r => r.id == rank.roleID);
	if (!role) {
		if (!silent) channel.send(message.author + ", this rank's role doesn't exist");
		return false;
	}

	if (!silent) {
		if (reactions) {
			let m = await channel.send(role + ", you have been summoned by " + message.author + ". Use reactions to indicate how many minutes you'll take to get ready");
			try {
				await m.react("0️⃣");
				await m.react("5️⃣");
				await m.react("🔟");
			} catch (e) {
				console.error(e);
			}


		} else {
			channel.send(role + ", you have been summoned by " + message.author);
		}

	}

	return true;
};

exports.config = {
	"cooldown" : 30,
	"sharedCooldown" : true,
	"permission" : 4,
	"syntax" : [
		"rank_w"
	],
	"usage" : [
		"[rank abbreviation]"
	],
	"channels" : "all",
	"help" : "Pings a rank (use !ranks in <#369312036628463617> for a list)"
};

exports.condition = (client, message, arguments, options, permission) => {
	if ((arguments._command === "mention")) return true;
	return false;
};