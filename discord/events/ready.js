module.exports = async (client) => {
	client.log("log+", "Discord bot has started"); 
	
	client.discord.user.setStatus('available');
	
};