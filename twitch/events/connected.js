module.exports = async (client, address, port) => {
	console.log("connected");
	
	// Get summoner runes initially
	setTimeout(function(){
		console.log(client.actions);
	}, 20 * 1000);
	
	
	const cooldown = {};
	// Set all actions on cooldown initially
	client.actions.forEach((functions, name) => {
		functions.onCooldown = true;
		setTimeout(async function() {
			functions.onCooldown = false;
		}, functions.config.cooldown * 1000);
	});
	
	// Run all actions that are off cooldown every 10 seconds
	setInterval(async function() {
		client.actions.forEach((functions, name) => {
			if (!functions.onCooldown && functions.condition(client)) {
				functions.run(client);
				functions.onCooldown = true;
				setTimeout(async function() {
					functions.onCooldown = false;
				}, functions.config.cooldown * 1000);
			}
		});
	}, 10010) // A little extra, so this isn't executed before the cooldown is reset
	
	
	// Resets the !daily command at 3pm EST
	resetDaily = () => {
		// Reset   daily    at                                 EST               3pm
		const t = (24 * 3600 * 1000) - (new Date().getTime() - 5 * 3600 * 1000 - 15 * 3600 * 1000)%(24 * 3600 * 1000);
		setTimeout(async function() {
			client.dataStorage.del("currency.usedDaily");
			resetDaily();
		}, t);
		const hours = Math.floor(t/(3600 * 1000))
		console.log("resetting daily in " + hours + " hours, " + Math.floor((t - hours * 3600 * 1000)/(60 * 1000)) + " minutes");
	}
	resetDaily();
	
	
	return;
}