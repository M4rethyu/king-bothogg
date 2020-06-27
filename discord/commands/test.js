exports.run = async (client, message, arguments, options, permission) => {

	console.log(process.env.PROJECT_DOMAIN)

	return;
};

exports.config = {
	"cooldown" : 0,
	"sharedCooldown" : true,
	"permission" : 0,
	"syntax" : [
		
	],
	"channels" : "spam",
	"help" : "I'm using this to test code"
};

exports.condition = (client, message, arguments, options, permission) => {
	if (arguments._command === "test") return true;
	return false;
};