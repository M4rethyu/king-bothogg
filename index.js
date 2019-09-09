const tmi = require('tmi.js');

require('dotenv').config();

const fs = require("fs");
const { promisify } = require("util");
const readdir = promisify(require("fs").readdir);

// Define configuration options
const opts = {
	identity: {
		username: process.env.BOT_USERNAME,
		password: process.env.OAUTH_TOKEN
	},
	channels: [
		process.env.CHANNEL_NAME
	]
};

// Create a client with our options
const client = new tmi.client(opts);

client.config = require("./config.json");

//client.commands = [];
//client.autoresponses = [];

const init = async () => {
	// Load commands
	var cmdMap = new Map();
	const cmdFiles = await readdir("./commands");
	console.log(`Loading a total of ${cmdFiles.length} commands.`);
	cmdFiles.forEach((file, i) => {
		if (!file.endsWith(".js")) return; // only load .js files
		const commandName = file.slice(0,-3)
		console.log(`Loading Command: ${commandName}`);
		const command = require(`./commands/${file}`);
		cmdMap.set(commandName,
			{
				"run" : command.run,
				"condition" : command.condition,
				"config" : command.config
			}
		)
	});
	// Sort commands
	commandOrder = ["ping", "template"] // Order, in which the commands will be tested
	client.commands = new Map();
	console.log("Sorting commands...");
	commandOrder.forEach(function(element) {
		if (!cmdMap.has(element)) return; // Skip name if corresponding command doesn't exist
		client.commands.set(element, cmdMap.get(element));
		cmdMap.delete(element);
	});
	console.log("Done sorting commands");
	client.commands = new Map([...client.commands,...cmdMap]);
	console.log(client.commands);
	
	// Load responses
	var resMap = new Map();
	const resFiles = await readdir("./responses");
	console.log(`Loading a total of ${resFiles.length} responses.`);
	resFiles.forEach((file, i) => {
		if (!file.endsWith(".js")) return; // only load .js files
		const responseName = file.slice(0,-3)
		console.log(`Loading Response: ${responseName}`);
		const response = require(`./responses/${file}`);
		resMap.set(responseName,
			{
				"run" : response.run,
				"condition" : response.condition,
				"config" : response.config
			}
		)
	});
	// Sort responses
	responseOrder = ["erick", "template"] // Order, in which the autoresponses will be tested
	client.responses = new Map();
	console.log("Sorting responses...");
	responseOrder.forEach(function(element) {
		if (!resMap.has(element)) return; // Skip name if corresponding response doesn't exist
		client.responses.set(element, resMap.get(element));
		resMap.delete(element);
	});
	console.log("Done sorting responses");
	client.responses = new Map([...client.responses,...cmdMap]);
	console.log(client.responses);
	
	// Load events
	const evtFiles = await readdir("./events/");
	console.log(`Loading a total of ${evtFiles.length} events.`);
	evtFiles.forEach(file => {
		const eventName = file.split(".")[0];
		console.log(`Loading Event: ${eventName}`);
		const event = require(`./events/${file}`);
		// Bind the client to any event, before the existing arguments
		// provided by the twitch.js event.
		// This line is awesome by the way. Just sayin'.
		client.on(eventName, event.bind(null, client));
	});
	
	client.connect();
};


try {
	init();
} catch(err) {
	console.log(err);
}

client.say("xMarethyu", `You rolled a number. Link: https://glitch.com/~twitch-chatbot`);