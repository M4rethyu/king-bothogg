exports.run = async (client) => {
	
	const channel = client.discord.cultChannel();

	channel.send("Dear Children of The Great Hogg: Here is your daily reminder, that **this is not a cult.** Thank you.");
	//channel.send("Dear Children of The Great Hogg: Here is your very irregular reminder, that **this is not a cult.** Thank you.");

	return;
};

exports.config = {
	"time" : ["22:33:33"]
};

exports.condition = (client) => {
	return true;
};