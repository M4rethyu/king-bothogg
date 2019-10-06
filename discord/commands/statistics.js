exports.run = async (client, message, permission, command, args, content) => {
	
	const excludeErick = args.includes("-e")
	
	const map = client.persist("currency.amount");
	//if (map == undefined) return false;
	
	var sum = 0;
	const names = Object.getOwnPropertyNames(map);
	names.forEach(name => {
		if (excludeErick && name == "king_nidhogg") return;
		sum += map[name];
	});
	const n = names.length + (excludeErick?-1:0);
	const avg = sum/n
	
	console.log(n)
	console.log(sum)
	console.log(avg)
	
	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0
};

exports.condition = (client, message, permission, command, args, content) => {
	if (command === "statistics") return true;
	return false;
};

exports.help = "Statistics on nidcoins"