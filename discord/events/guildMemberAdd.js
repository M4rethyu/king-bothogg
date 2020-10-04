let recentlyJoined = []

module.exports = async (client, member) => {
	client.discord.arrivalChannel().send("Greetings, " + member + ". Welcome to **Nidhogg's Den** <:kingW:503777519607218197>");

	let raiderRole = client.discord.raiderRole();
	if (client.discord.lockdown) { // Lockdown on
		// Mark joining member as raider
		await member.addRole(raiderRole.id);
	} else { // Lockdown off
		// Run code to test for Lockdown activation condition
		let date = new Date();
		let time = date.getTime();
		recentlyJoined.push({"member": member, "time": time});
		while (recentlyJoined.length > 5) {
			recentlyJoined.shift();
		}
		if (recentlyJoined.length === 5) {
			if (time - recentlyJoined[0]["time"] < 15000) {
				client.discord.lockdown = true;
				for (let member of recentlyJoined) {
					member = member["member"];
					await member.addRole(raiderRole.id);
				}
				client.discord.consoleChannel().send("<@&211329653250588672>, lockdown was enabled because 5 users joined within 15 seconds")
			}
		}
	}
};