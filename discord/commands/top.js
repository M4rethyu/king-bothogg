exports.run = async (client, message, permission, command, args, content) => {
	
	const number = Number(args[0]);
	if (Number.isNaN(number)) {
		message.channel.send(message.author + ", please specify a valid number (!top [number])");
		return false;
	}
	
	plebLimit = 10;
	if (number > plebLimit && permission > 3) {
		message.channel.send(message.author + ", please specify a number from 1 to " + plebLimit);
		return false;
	}
	
	if (number < 1) {
		message.channel.send(message.author + ", please specify a number greater than or equal to 1");
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
	
	top.forEach((e, i) => { top[i] = e.join(": ").replace("_", "\\_") });
	console.log(top)
	
	message.channel.send(message.author + ", The top " + number + " are:\n" + top.join(", "));
	
	return;
};

exports.config = {
	"cooldown" : 30,
	"sharedCooldown" : true,
	"permission" : 5
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "top") return true;
	return false;
};

exports.help = "A template for commands, so I can just copy paste"