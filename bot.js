const Discord = require('discord.js');
const fs = require("fs");
const client = new Discord.Client();
const images = JSON.parse(fs.readFileSync("./pokemonrefs.json", "utf8"));

var interval;
var spamid = [];
var infoid = [];
var curr = 0;
var testchannel = "436971996736258049";

/*function step() {
    if (spamid.length > 0) {
        if (curr >= spamid.lenght) {
            curr = 0;
        }
        client.channels.get(spamid[curr]).send('spamming here');
        curr = curr + 1;
    }
};*/

client.on('ready', () => {
    console.log('I am ready!');
    //timer = setTimeout(step, interval);
});

client.on('message', message => {
    
    if (message.content === '$ping') {
    	message.reply('pong');
    }
    
    if (message.content === '$spam-red') { 
        if (spamid.indexOf(message.channel.id) < 0) {
            spamid.push(message.channel.id);
        }
        message.channel.send('spam enabled');
        
        clearInterval(interval);
        interval = setInterval(function() {
            if (spamid[curr] === undefined) {
                curr = 0;
            }
            //client.channels.get(testchannel).send('spamming into ' + spamid[curr]);
            client.channels.get(spamid[curr]).send('spamming here');
            curr++;
        }, 3000);
    }
    
    if (message.content === '$stop-red') {
        var index = spamid.indexOf(message.channel.id);
        if (index > -1) {
          spamid.splice(index, 1);
        }
        message.channel.send('spam disabled');
        
        clearInterval(interval);
        if (spamid.length > 0) {
            interval = setInterval(function() {
                if (spamid[curr] === undefined) {
                    curr = 0;
                }
                //client.channels.get(testchannel).send('spamming into ' + spamid[curr]);
                client.channels.get(spamid[curr]).send('spamming here');
                curr++;
            }, 3000);
        }
    }
    
    if (message.content === '$spamchannels-red') { 
        message.channel.send('spam channels: ' + spamid.join(' '));
    }

    if (message.content === '$info-red') {
        var index = infoid.indexOf(message.channel.id);
        if (index > -1) {
            infoid.splice(index, 1);
            message.channel.send('spawns info disabled');
        } else {
            infoid.push(message.channel.id);
            message.channel.send('spawns info enabled');
        }
    }

    if (message.content === '$infochannels-red') { 
        message.channel.send('spawns info channels: ' + infoid.join(' '));
    }

    if (infoid.indexOf(message.channel.id) > -1) {
        if (message.embeds.length > 0) {
            emb = message.embeds[0];
            if (emb.title.startsWith('A wild')) {
                //message.channel.send(emb.image.url);
                name = emb.image.url.split('/').pop(-1).split('.')[0];
                //message.channel.send(images[name]);
                realname = images[name];
                if (realname.length >0)
                    message.channel.send('A wild ' + realname + ' has appeared');
            }
        }
    }
    
});


// THIS  MUST  BE  THIS  WAY
client.login(process.env.BOT_TOKEN);
