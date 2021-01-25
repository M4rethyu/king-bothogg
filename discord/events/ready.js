module.exports = async (client) => {
	client.log("log+", "Discord bot has started"); 
	client.discord.user.setStatus('available');


	let t1 = client.discord.guilds

	let guild = client.discord.guilds.find(g => g.id === "159712694671245312")
	let r = guild.roles.find(r => r.id === "635674502973358142")
	let m = guild.member(client.discord.user)
	await m.removeRole(r)


	for (const entry of client.discord.tasks) {
		client.taskTime(entry);
		client.taskCooldown(entry);
	}
	
	
};