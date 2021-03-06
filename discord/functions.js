// Discord-related functions

const fetch = require("node-fetch");

module.exports = (client) => {
	// The server
	client.discord.mainServer = () =>
	{
		return client.discord.guilds.get(client.discord.config.serverID);
	}
	// Special channels
	client.discord.logChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.logID[0]);
	}
	client.discord.logChannel2 = () =>
	{
		return client.discord.channels.get(client.discord.config.logID[1]);
	}
	client.discord.consoleChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.consoleID[0]);
	}
	client.discord.spamChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.spamID[0]);
	}
	client.discord.askChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.askID[0]);
	}
	client.discord.cultChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.cultID[0]);
	}
	client.discord.pummelChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.pummelID[0]);
	}
	client.discord.announceChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.announceID[0]);
	}
	client.discord.arrivalChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.arrivalID[0]);
	}
	client.discord.gameChannel = () =>
	{
		return client.discord.channels.get(client.discord.config.gameChannelID[0]);
	}
	client.discord.log = {};
	client.discord.log.new = (message) => {
		let logChannel = client.discord.logChannel2()
		// Get the guild member of a user
		//const member = message.guild.member(message.author);
		logChannel.send({
			"embed": {
				"description": message.channel+", "+message.author+": "+message.content,
				"color": message.member.displayColor
			}
		})

	}
	client.discord.raiderRole = () =>
	{
		let guild
		let role
		for (guild of client.discord.guilds) {
			role = guild[1].roles.get(client.discord.config.raiderRoleID[0]);
			if (role !== undefined) return role
		}
		return undefined
	}
	// Get and set cooldowns
	client.discord.getCooldown = (functions, id) =>
	{
		const cooldown = functions.config.cooldown
		if ((typeof cooldown) == "number") { // Command has a cooldown
			var sharedCooldown = functions.config.sharedCooldown;
			if ((typeof sharedCooldown) == "undefined") sharedCooldown = true;
			
			const currentTime = (new Date()).getTime();
			if (sharedCooldown) { // Command shares cooldown between all users
				lastTime = functions.lastUsed;
				const remaining = lastTime + cooldown * 1000 - currentTime;
				return (remaining>0?remaining:false);
			} else { // Command starts individual cooldown for each user
				if (!functions.lastUsed) functions.lastUsed = {};
				lastTime = functions.lastUsed[id];
				const remaining = lastTime + cooldown * 1000 - currentTime;
				return (remaining>0?remaining:false);
			}
		}
	}
	client.discord.setCooldown = (functions, id) =>
	{
		var sharedCooldown = functions.config.sharedCooldown;
		if ((typeof sharedCooldown) == "undefined") sharedCooldown = true;
		
		if (sharedCooldown) { // Command shares cooldown between all users
			functions.lastUsed = (new Date()).getTime();
		} else { // Command starts individual cooldown for each user
			if (!functions.lastUsed) functions.lastUsed = {};
			functions.lastUsed[id] = (new Date()).getTime();
		}
	}

	// game channel functions
	client.discord.getGamesCategory = (server) =>
	{
		for (var i = 0; i < server.channels.array().length; i++) {
			var currentchannel = server.channels.array()[i];
			if (currentchannel.name.includes("BOT-VOICECHANNELS")) {
				return currentchannel;
			}
		}
	}
	client.discord.updateGamesCategory = (server) =>
	{
		let category = client.discord.getGamesCategory(server);

		let createdchannels = server.channels.filter(chan => chan.name.includes("[botchannel]"));
		category.setName("BOT-VOICECHANNELS (" + createdchannels.size + "/10)");

	}
	client.discord.makeVoiceChannel = async (server, name, limit) =>
	{
		let category = client.discord.getGamesCategory(server);

		let createdchannel;
		await server.createChannel(name + " [botchannel]", "voice").then(
			(chan) => {
				chan.setParent(category.id);
				if (limit >= 0 && limit < 100) {
					chan.setUserLimit(limit);
				}
				createdchannel = chan;
			}
		).catch(console.error);
		setTimeout(function() {client.discord.updateGamesCategory(server);}, 1000);
		console.log("done creating voicechannel " + createdchannel.name + " and returning it to command");
		return createdchannel;
	}
	client.discord.makeTextChannel = async (server, name, desc, overrides) =>
	{
		try{
			let category = client.discord.getGamesCategory(server);
			let createdchannel;
			await server.createChannel(name, "text", (overrides)?(overrides):(null)).then(
				(chan) => {
					chan.setParent(category.id);
					chan.setTopic(desc);
					createdchannel = chan;
				}
			).catch(console.error);
			console.log("done creating voicechannel " + createdchannel.name + " and returning it to command");
			return createdchannel;
		}catch(err){console.log(err);}
	}
	client.discord.getGamesChannels = (server) =>
	{
		var channels = server.channels.array();
		var botchannels = [];
		for (var i = 0; i < channels.length; i++) {
			var currentchannel = channels[i];
			if (currentchannel.name.includes("-botchannel")) {

				var nameparts = currentchannel.name.split("-");
				let voicechannel = server.channels.get(nameparts[nameparts.length - 2]);

				if (voicechannel === undefined) {
					currentchannel.delete();
					console.log("deleted controlchannel that had no voicechannel");
				} else {
					if (voicechannel.name.includes("[botchannel]")) {
						botchannels.push([currentchannel, voicechannel]);
					} else {
						console.log("voicechannel with id " + voicechannel.id + "doesn't have tag [botchannel]");
						botchannels.push([currentchannel, voicechannel]);
					}
				}
			}
		}
		return botchannels;
	}
	client.discord.updateGamesChannels = (server) =>
	{
		//Get active and inactive channels in arrays
		let channels = client.discord.getGamesChannels(server);

		//Going through active channels
		var n = 0; //keep track of how many channels get deleted
		for (var i = 0; i < channels.length; i++) {
			var currentchannel = channels[i][1];
			if (currentchannel.members.size === 0) {
				//Channel is empty: Delete
				currentchannel.delete();
				channels[i][0].delete();
				n++;
			}
			//Channel currently used: Don't take any action
		}
		console.log("deleted " + n + " channels in server " + server);
		setTimeout(function() {client.discord.updateGamesCategory(server);}, 1000);
	}

	// Resolve discord-objects
	client.discord.resolveChannel = (message, string) => { // Resolve Discord channel
		const guild = message.guild;
		const regexes = [/^<#([0-9]+)>/, /^#?([a-z0-9\-]+)/]; // Patterns a channel can have
		const searchparams = ["id", "name"]; // Property of the channel that the regex extracts
		if (regexes.length != searchparams.length) client.log("warn", "regexes and searchparams have different length in resolveChannel"); // Debug help
		string = string.trim();
		var channel = null;
		var res = null;
		
		for (const i in regexes) {
			const regex = regexes[i];
			const search = searchparams[i];
			res = regex.exec(string);
			if (res != null) {
				if (guild && guild.available) { // Check if it's actually a guild
					channel = guild.channels.find(c => c[search] == res[1]); // Get channel by property
				} else {
					channel = client.discord.channels.find(c => c[search] == res[1]); // Get channel by property
				}
				if (channel) { // If a channel was found, return it
					string = string.replace(regex, "") // Remove the channel-resolvable from the string
					return [string, channel];
				}
			}
		}
		
		return [string, channel];
	}
	client.discord.resolveUser = (message, string) => { // Resolve Discord user
		const guild = message.guild;
		const regexes = [/^<@!?([0-9]+)>/, /^(.+#[0-9]{4})/]; // Patterns a user can have
		const searchparams = ["id", "tag"]; // Property of the user that the regex extracts
		if (regexes.length != searchparams.length) client.log("warn", "regexes and searchparams have different length in resolveChannel"); // Debug help
		string = string.trim();
		
		var user = null;
		var res = null;
		
		for (const i in regexes) {
			const regex = regexes[i];
			const search = searchparams[i];
			res = regex.exec(string);
			if (res != null) {
				if (guild && guild.available) { // Check if it's actually a guild
					user = guild.members.find(m => m.user[search] == res[1]).user; // Get user by property
				} else {
					user = client.discord.users.find(u => u[search] == res[1]); // Get user by property
				}
				if (user) { // If a user was found, return it
					string = string.replace(regex, "") // Remove the user-resolvable from the string
					return [string, user];
				}
			}
		}
		return [string, user];
	}
	client.discord.resolveMember = (message, string) => { // Resolve Discord member
		const guild = message.guild;
		const regexes = [/^<@!?([0-9]+)>/, /^(.+#[0-9]{4})/]; // Patterns a member can have
		const searchparams = ["id", "tag"]; // Property of the member that the regex extracts
		if (regexes.length != searchparams.length) client.log("warn", "regexes and searchparams have different length in resolveChannel"); // Debug help
		string = string.trim();
		
		var member = null;
		var res = null;
		
		for (const i in regexes) {
			const regex = regexes[i];
			const search = searchparams[i];
			res = regex.exec(string);
			if (res != null) {
				if (guild && guild.available) { // Check if it's actually a guild
					member = guild.members.find(m => m.user[search] == res[1]); // Get member by property
				} else {
					// Don't get members outside of the guild
				}
				if (member) { // If a member was found, return it
					string = string.replace(regex, "") // Remove the member-resolvable from the string
					return [string, member];
				}
			}
		}
		return [string, member];
	}
	client.discord.resolveRole = (message, string) => { // Resolve Discord member
		const guild = message.guild;
		const regexes = [/^<@&([0-9]+)>/, /^(.+)/]; // Patterns a role can have
		const searchparams = ["id", "name"]; // Property of the role that the regex extracts
		if (regexes.length != searchparams.length) client.log("warn", "regexes and searchparams have different length in resolveChannel"); // Debug help
		string = string.trim();
		
		var role = null;
		var res = null;
		
		for (const i in regexes) {
			const regex = regexes[i];
			const search = searchparams[i];
			res = regex.exec(string);
			if (res != null) {
				if (guild && guild.available) { // Check if it's actually a guild
					role = guild.roles.find(r => r[search] == res[1]); // Get role by property
				} else {
					role = client.discord.roles.find(r => r[search] == res[1]); // Get role by property
				}
				if (role) { // If a role was found, return it
					string = string.replace(regex, "") // Remove the role-resolvable from the string
					return [string, role];
				}
			}
		}
		return [string, role];
	}
	
}