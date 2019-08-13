var Discord = require('discord.js')
var bot = new Discord.Client();

// Variables
var getNotes = "";
var getAccomplishedData = "";
var addNextData = "";
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

bot.login(process.env.BOT_TOKEN);

bot.on('ready', () => {
    console.log("Connected");
});

bot.on('message', message => {

    // Variables
    var sender = message.author; //The person who sent the message
    var msg = message.content;
    var prefix = "!" //The text before commands, you can put anything that you prefer

    if (message.author.id != '610354398995939332' && message.channel.id === '596210004277592066') {
        if (msg.startsWith('!', 0)) {
            switch (msg) {
                case "!showProgress":
                 if (getProgress == "") message.channel.send("Needs to be decided !!!");
                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!showAccomplished":
                    if (getAccomplishedData == "") message.channel.send("Nothing Yet !");
                    else message.channel.send(getAccomplishedData);

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!clearAccomplished":
                    getAccomplishedData = "";

                    message.channel.send("CLEARED !!!");

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!showNext":
                    if (addNextData == "") message.channel.send("Nothing Yet !");
                    else message.channel.send(addNextData);

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!clearNext":

                    addNextData = "";

                    message.channel.send("CLEARED !!!");

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!showNotes":
                    if (getNotes == "") message.channel.send("Nothing Yet !");
                    else message.channel.send(getNotes);

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!clearNotes":

                    getNotes = "";

                    message.channel.send("CLEARED !!!");

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                case "!getLogs":
                    message.channel.send("Here are the logs: \n" + log);

                    break;

                case "!help":
                    message.channel.send("Here you go " + sender + "\n\n" + helpMessage);

                    log = log + "\n" + sender + " did " + msg + "\n";
                    break;

                default:
                    if (msg.substr(0, 8) == "!addNext") {
                        addNextData = addNextData + "\n" + msg.substring(9, msg.length);

                        message.channel.send("NOTED !!!");

                        log = log + "\n" + sender + " did " + msg + "\n";
                    }

                    else if (msg.substr(0, 19) == "!updateAccomplished") {
                        getAccomplishedData = getAccomplishedData + "\n" + msg.substring(20, msg.length);

                        message.channel.send("NOTED !!!");

                        log = log + "\n" + sender + " did " + msg + "\n";
                    }

                    else if (msg.substr(0, 9) == "!addNotes") {
                        getNotes = getNotes + "\n" + msg.substring(10, msg.length);

                        message.channel.send("NOTED !!!");

                        log = log + "\n" + sender + " did " + msg + "\n";
                    }

                    else {
                        message.delete();
                        message.channel.send("Seems that this commands is not available. To see available commands type $help and available list of commands wil be presented.")
                    }

                    if (log.includes("undefined")) {
                        log.replace("undefined", "");
                    }

                    break;
            }
        }
       
    }
});
