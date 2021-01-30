exports.run = async (client) => {
	
	const channel = client.discord.cultChannel();

	//channel.send("Dear Children of The Great Hogg: Here is your daily reminder, that **This is not a cult.** Thank you.");
	//channel.send("Dear Children of The Great Hogg: Here is your daily reminder, that **romance is dead** <:LoafPensive:720482702142210078>. Thank you.");
	channel.send("Dear Children of The Great Hogg: Here is your daily reminder to **fight for waifu rights!** <:hoggLove:674837001060745216> Thank you.");

	return;
};

exports.config = {
	"time" : ["22:33:33"]
};

exports.condition = (client) => {
	return true;
};