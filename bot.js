var Discord = require('discord.js')
var logger = require('winston');

bot.login(process.env.BOT_TOKEN);

// Variables
var getNotes = "";
var getAccomplishedData = "";
var addNextData = "";
var auther;
var log = "";
var helpMessage;

//reading help command messages from local file
var fs = require('fs'),
    path = require('path'),
    filePath = path.join(__dirname, 'help.txt');

fs.readFile(filePath, { encoding: 'utf-8' }, function (err, data) {
    if (!err) {
        helpMessage = data;
    }
    else {
        console.log(err);
    }
});

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

//when the bot executes
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

bot.on('message', message => {

    // Variables
    var sender = message.author; //The person who sent the message
    var msg = message.content;
    var prefix = "$" //The text before commands, you can put anything that you prefer

    if (message.author.id != '379670051311058944' && message.channel.id === '379669526935240704') {
        if (msg.startsWith('$', 0)) {
            switch (msg) {
                case "$showProgress":
                    message.channel.send("Needs to be decided !!!");

                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$showAccomplished":
                    message.channel.send(getAccomplishedData);
                    
                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$clearAccomplished":
                    getAccomplishedData = "";

                    message.channel.send("CLEARED !!!");
                    
                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$showNext":
                message.channel.send(addNextData);
                    
                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$clearNext":
                
                    addNextData = "";

                    message.channel.send("CLEARED !!!");
                   
                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$showNotes":
                message.channel.send(getNotes);
                    
                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$clearNotes":
                
                    getNotes = "";

                    message.channel.send("CLEARED !!!");

                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                case "$getLogs":
                message.channel.send("Here are the logs: \n" + log);
                    
                break;

                case "$help":
                message.channel.send("Here you go " + auther + "\n\n" + helpMessage);
                    
                    log = log + "\n" + auther + " did " + message + "\n";
                    break;

                default:
                    message.delete();
                    message.channel.send("Seems that this commands is not available. To see available commands type $help and available list of commands wil be presented.")
                    break;
            }

            if(message.substr(0, 8) == "$addNext"){
                addNextData = addNextData + "\n" + message.substring(9, message.length);
        
                message.channel.send("NOTED !!!");
        
                log = log + "\n" + auther + " did " + message + "\n";
            }
        
            if(message.substr(0, 19) == "$updateAccomplished"){
                getAccomplishedData = getAccomplishedData + "\n" + message.substring(20, message.length);
        
                message.channel.send("NOTED !!!");
        
                log = log + "\n" + auther + " did " + message + "\n";
            }
        
            if(message.substr(0, 9) == "$addNotes"){
                getNotes = getNotes + "\n" + message.substring(10, message.length);
        
                message.channel.send("NOTED !!!");
        
                log = log + "\n" + auther + " did " + message + "\n";
            }
        
            if(log.includes("undefined")){
                log.replace("undefined", "");
            }
        }
        else {
            message.channel.send(sender + " this bot only accepts commands that start with '$'. Use $help to see available commands")
        }
    }

})
