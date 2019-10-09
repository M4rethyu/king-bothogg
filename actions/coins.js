exports.run = async (client) => {
	const live = await client.twitch.live("king_nidhogg")
	if (live) {
		client.log("log", "awarding chatters a nidcoin");
		
		const chatters = (await client.twitch.viewerlist("king_nidhogg")).chatters;
		var list = chatters.broadcaster.concat(chatters.vips, chatters.moderators, chatters.staff, chatters.admins, chatters.global_mods, chatters.viewers);
		
		list.forEach(name => {
			if (client.twitch.config.bots.includes(name)) return;
			const amount = client.currency(name, 1);
		});
	}
	return;
};

exports.config = {
	"cooldown" : 1 * 60
};

exports.condition = (client) => {
	return true;
};