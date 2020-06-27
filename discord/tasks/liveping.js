const Discord = require('discord.js');
const fetch = require("node-fetch");

exports.run = async (client) => {
	/*
	//const name = "KiNG_Nidhogg";
	const name = "yathatwasabanana";
	//const streams = await fetch("https://api.twitch.tv/helix/streams/?oauth_token=" + process.env.TWITCH_TOKEN + "&channel=" + name + "&stream_type=live")
	const streams = await fetch("https://api.twitch.tv/helix/streams/?client_id=" + "oilf0ghnlec32b46liguno9uozyn87" + "&oauth_token=" + process.env.TWITCH_TOKEN + "&channel=" + name + "&stream_type=live")
	//const streams = await fetch("https://api.twitch.tv/kraken/streams/?oauth_token=" + process.env.TWITCH_TOKEN + "&stream_type=live")
	console.log(streams)
	
	
	const exampleEmbed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle('Some title')
		.setURL('https://discord.js.org/')
		.setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
		.setDescription('Some description here')
		.setThumbnail('https://i.imgur.com/wSTFkRM.png')
		.addField('Regular field title', 'Some value here')
		.addBlankField()
		.addField('Inline field title', 'Some value here', true)
		.addField('Inline field title', 'Some value here', true)
		.addField('Inline field title', 'Some value here', true)
		.setImage('https://i.imgur.com/wSTFkRM.png')
		.setTimestamp()
		.setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

	*/
	
	
	try {
		client.discord.announceChannel().send("Hey <@&713806314236674049>! KiNG_Nidhogg is live on twitch: http://www.twitch.tv/king_nidhogg");
	} catch(err) {
		console.log("failed to announce:")
		console.log(err)
	}
	
	return;
};

exports.config = {
	
};

exports.condition = (client) => {
	return false;
};