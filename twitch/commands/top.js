exports.run = async (client, channel, userstate, command, args, content) => {
	
	const number = Number(args[0]);
	if (Number.isNaN(number)) {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a valid number (!top [number])");
		return false;
	}
	
	if (number > 5 && userstate.permission > 3) {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a number from 1-5");
		return false;
	}
	
	if (number < 1) {
		client.twitch.say(channel, "@" + userstate.username + ", please specify a number >= 1");
		return false;
	}
	
	const map = client.persist("currency.amount");
	const names = Object.getOwnPropertyNames(map);
	
	var top = new Array(names.length);
	var i = 0;
	for (const name of names) {
		const amount = map[name];
		top[i] = [name, amount];
		i++;
	}
	
	top.sort((a, b) => { return b[1] - a[1]; });
	
	top = top.slice(0, number);
	
	top.forEach((e, i) => { top[i] = e.join(": ") });
	console.log(top)
	
	client.twitch.say(channel, "@" + userstate.username + ", The top " + number + " are: " + top.join(", "));
	
	return;
};

exports.config = {
	"cooldown" : 30,
	"sharedCooldown" : true,
	"permission" : 5
};

exports.condition = (client, channel, userstate, command, args, content) => {
	if (command === "top") return true;
	return false;
};

exports.help = "A template for commands, so I can just copy paste"