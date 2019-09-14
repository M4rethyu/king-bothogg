async function main() {
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
		channels: []
	};

	// Create a client with our options
	const client = new tmi.client(opts);

	client.config = require("./config.json");

	client.opts.channels = client.config.channels;

	client.spelling = {}; // Initiate spelling Object
	require("./modules/functions.js")(client);

	client.config.hosted = client.checkHosted();
	
	if (client.config.hosted) {
		const http = require('http');
		const express = require('express');
		const app = express();
		
		if (!(process.env.RUN == "true")) {
			app.get("/", (request, response) => { response.sendStatus(204); });
		app.listen(process.env.PORT);
		}
		
		while (!(process.env.RUN == "true")) {
			console.log("bot is idle");
			await (function(){ return new Promise(resolve => setTimeout(resolve, 5000)); })();
		}
		
		app.get("/", (request, response) => { response.sendStatus(200); });
		app.listen(process.env.PORT);
		setInterval(() => {
			http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
		}, 280000);
	}

	client.answers = require("./modules/answers.json");

	const commandOrder = ["ping", "template"]; // Order, in which the commands will be tested
	const responseOrder = ["erick", "nidhogg", "runes"]; // Order, in which the autoresponses will be tested
	client.unconditionalResponses = ["erick", "nidhogg"]; // Autoresponses, which will trigger no matter what other things are also triggered by the message
	/*
	client.spelling = {}; // Initiate spelling Object
	client.spelling.surrounding = [" ",",","\*", "'", "\@", "?", "!", "s "]; // Characters, which may also indicate the beginning or ending of a name (possibly useless with new change)
	client.spelling.erickTrue = ["eric", "erik"];
	client.spelling.erickFalse = ["rick"];
	client.spelling.nidhoggTrue = ["nid hog", "nighog", "niddhog"];
	client.spelling.nidhoggFalse = [];
	client.spelling.useLevenshtein = true;
	*/
	const init = async () => {
		
		// Load commands
		var cmdMap = new Map();
		const cmdFiles = await readdir("./commands");
		console.log(`Loading a total of ${cmdFiles.length} commands...`);
		cmdFiles.forEach((file, i) => {
			if (!file.endsWith(".js")) return; // only load .js files
			const commandName = file.slice(0,-3)
			console.log(`Loading Command: ${commandName}`);
			const command = require(`./commands/${file}`);
			cmdMap.set(commandName,
				{
					"run" : command.run,
					"condition" : command.condition,
					"config" : command.config,
					"onCooldown" : false
				}
			)
		});
		// Sort commands
		client.commands = new Map();
		console.log("Sorting commands...");
		commandOrder.forEach(function(element) {
			if (!cmdMap.has(element)) return; // Skip name if corresponding command doesn't exist
			client.commands.set(element, cmdMap.get(element));
			cmdMap.delete(element);
		});
		console.log("Done sorting commands");
		client.commands = new Map([...client.commands,...cmdMap]);
		
		// Load responses
		var resMap = new Map();
		const resFiles = await readdir("./responses");
		console.log(`Loading a total of ${resFiles.length} responses...`);
		resFiles.forEach((file, i) => {
			if (!file.endsWith(".js")) return; // only load .js files
			const responseName = file.slice(0,-3)
			console.log(`Loading Response: ${responseName}`);
			const response = require(`./responses/${file}`);
			resMap.set(responseName,
				{
					"run" : response.run,
					"condition" : response.condition,
					"config" : response.config,
					"onCooldown" : false
				}
			)
		});
		
		// Sort responses
		client.responses = new Map();
		console.log("Sorting responses...");
		responseOrder.forEach(function(element) {
			if (!resMap.has(element)) return; // Skip name if corresponding response doesn't exist
			client.responses.set(element, resMap.get(element));
			resMap.delete(element);
		});
		client.responses = new Map([...client.responses,...resMap]);
		
		// Load events
		const evtFiles = await readdir("./events/");
		console.log(`Loading a total of ${evtFiles.length} events...`);
		evtFiles.forEach(file => {
			const eventName = file.split(".")[0];
			console.log(`Loading Event: ${eventName}`);
			const event = require(`./events/${file}`);
			// Bind the client to any event, before the existing arguments
			// provided by the twitch.js event.
			// This line is awesome by the way. Just sayin'.
			client.on(eventName, event.bind(null, client));
		});
		console.log("done loading events.")
		
		client.connect();
	};


	try {
		init();
	} catch(err) {
		console.log(err);
	}
}
main();