async function main() {
	const tmi = require('tmi.js');
	
	require('dotenv').config();

	const fs = require("fs");
	const { promisify } = require("util");
	const readdir = promisify(require("fs").readdir);

	
	
	
	const client = {};
	// Load modules
	client.config = require("./config.json"); // Configuration settings
	client.spelling = require("./modules/spelling.json"); // Spelling correction
	client.answers = require("./modules/answers.json"); // Phrases used across the bot
	
	// Define twitch configuration options
	const twitch_opts = {
		identity: {
			username: process.env.TWITCH_USERNAME,
			password: process.env.TWITCH_TOKEN
		},
		channels: []
	};
	// Create and bind twitch client
	client.twitch = new tmi.client(twitch_opts); // Twitch Client
	client.twitch.opts.channels = client.config.channels; // Set channels from config file
	// Create and bind league client
	const {Kayn, REGIONS} = require('kayn')
	client.league = Kayn(process.env.LEAGUE_TOKEN)({ // Set configuration options
		region: REGIONS.NORTH_AMERICA,
		apiURLPrefix: 'https://%s.api.riotgames.com',
		locale: 'en_US',
		debugOptions: {
			isEnabled: true,
			showKey: false,
		},
		requestOptions: {
			shouldRetry: true,
			numberOfRetriesBeforeAbort: 3,
			delayBeforeRetry: 1000,
			burst: false,
			shouldExitOn403: false,
		},
		cacheOptions: {
			cache: null,
			timeToLives: {
				useDefault: false,
				byGroup: {},
				byMethod: {},
			},
		},
	})
	
	require("./modules/functions.js")(client); // Bind functions directly to client

	client.config.hosted = client.checkHosted(); // Tests if this program is running on glitch
	
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

	const commandOrder = ["ping", "template"]; // Order, in which the commands will be tested
	const responseOrder = ["erick", "nidhogg", "runes"]; // Order, in which the autoresponses will be tested
	client.twitch.unconditionalResponses = ["erick", "nidhogg"]; // Autoresponses, which will trigger no matter what other things are also triggered by the message
	
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
		client.twitch.commands = new Map();
		console.log("Sorting commands...");
		commandOrder.forEach(function(element) {
			if (!cmdMap.has(element)) return; // Skip name if corresponding command doesn't exist
			client.twitch.commands.set(element, cmdMap.get(element));
			cmdMap.delete(element);
		});
		console.log("Done sorting commands");
		client.twitch.commands = new Map([...client.twitch.commands,...cmdMap]);
		
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
		client.twitch.responses = new Map();
		console.log("Sorting responses...");
		responseOrder.forEach(function(element) {
			if (!resMap.has(element)) return; // Skip name if corresponding response doesn't exist
			client.twitch.responses.set(element, resMap.get(element));
			resMap.delete(element);
		});
		client.twitch.responses = new Map([...client.twitch.responses,...resMap]);
		
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
			client.twitch.on(eventName, event.bind(null, client));
		});
		console.log("done loading events.")
		
		client.twitch.connect();
	};


	try {
		init();
	} catch(err) {
		console.log(err);
	}
}
main();