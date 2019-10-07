exports.run = async (client, message, permission, command, args, content) => {
	const channel = message.channel;
	
	var abbreviation = args[0];
	if (typeof abbreviation == "undefined") {
		channel.send(message.author + ", please specify a rank (!rank [rank] ([user]))");
		return false;
	}
	abbreviation = abbreviation.toLowerCase();
	
	var rank;
	for (const entry of client.discord.ranks) {
		if (entry[1].abbreviation == abbreviation) {
			rank = entry[1];
			break;
		}
	}
	
	if (typeof rank == "undefined") {
		channel.send(message.author + ", this rank doesn't exist");
		return false;
	}
	
	if (rank.permission < permission) {
		channel.send(message.author + ", you can't assign this rank.");
		return false;
	}
	
	const role = message.guild.roles.find(r => r.id == rank.roleID);
	if (!role) {
		channel.send(message.author + ", this rank's role doesn't exist. Please ping a mod, if you think this is unintended");
		return false;
	}
	
	var target = args[1];
	var targetID;
	if (typeof target == "undefined") {
		target = message.member;
	} else {
		if (permission > 3) {
			channel.send(message.author + ", you don't have permission to assign ranks to others");
			return false;
		}
		if (/<@!\d{1,}>/.test(target)) {
			targetID = target.substring(3,21);
			target = message.guild.members.find(m => m.id == targetID);
		} else if (/<@\d{1,}>/.test(target)) {
			targetID = target.substring(2,20);
			target = message.guild.members.find(m => m.id == targetID);
		} else {
			channel.send(message.author + ", please mention a user to assign a rank (!rank [rank] ([user]))");
			return false;
		}
	}
	
	if (target.roles.find(r => r.id == rank.roleID)) {
		target.removeRole(role)
			.then(
				function(){ channel.send(target + ", you no longer have the '" + rank.name + "' rank"); },
				function(){ channel.send(message.author + ", unfortunately I don't have permission to unassign the '" + rank.name + "' rank"); }
			)
		
	} else {
		target.addRole(role)
			.then(
				function(){ channel.send(target + ", you now have the '" + rank.name + "' rank"); },
				function(){ channel.send(message.author + ", unfortunately I don't have permission to assign the '" + rank.name + "' rank"); }
			)
	}
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 5
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "rank") return true;
	return false;
};

exports.help = "Assign ranks to yourself and others (if you're a mod)"