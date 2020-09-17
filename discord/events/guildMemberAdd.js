module.exports = async (client, member) => {
	//client.discord.arrivalChannel().send("Greetings, " + member + ". Welcome to **Nidhogg's Den** <:kingW:503777519607218197>");

	if (client.discord.lockdown) {
		let raiderRole = client.discord.raiderRole();
		await member.addRole(raiderRole.id);
	}
};