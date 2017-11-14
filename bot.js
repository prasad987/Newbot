var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');

var getData = "";
var setData;

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
        }
    }

    if (message == "$showProgress") {
        bot.sendMessage({
            to: channelID,
            message: 'Needs to be decided !!!'
        });   
    }

    if(message == "$help"){
        bot.sendMessage({
            to: channelID,
            message: "1. $showProgres - To see the progress of the project.\n2. $showAccomplished - To check how much has been done.\n3. $showNext - What to do next.\n 4. $add - Write this and after a space add the notes to be added.\n 5. $showNotes - To view Added notes.\n6. $clearNotes - To clear the created notes"
        });
    }

    if(message.substr(0, 4) == "$add"){
        getData = getData + "\n" + message.substring(5, message.length);

        bot.sendMessage({
            to: channelID,
            message: "NOTED !!!"
        })
    }

    if(message == "$showNotes"){
        bot.sendMessage({
            to: channelID,
            message: getData.toString()            
        })
    }

    if(message == "$clearNotes"){
        getData = "";

        bot.sendMessage({
            to: channelID,
            message: "CLEARED !!!"           
        })
    }
});