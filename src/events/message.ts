import { Message } from 'discord.js';
import Event from '../interfaces/event';
import bot from '..';
import Command from '../interfaces/command';
import { User, Server } from '../interfaces/databaseStructures';

const msgs: any = {
    pl: require('../../languages/pl.json'),
    en: require('../../languages/en.json')
}

export default class MessageEvent implements Event {
    name = 'message';

    async run(message: Message): Promise<void> {
        if(message.author.bot
           || !message.guild) return;

        let data: User = await bot.users.findOne({
            id: message.author.id,
            guild: message.guild.id
        });

        let options: Server = await bot.servers.findOne({
            id: message.guild.id
        });

        if(!options)
            bot.servers.insertOne(options = {
                id: message.guild.id,
                language: 'en',
                prefix: '&',
                ranking: true
            });

        let messages: any = msgs[options.language];

        if(!data)
            bot.users.insertOne({
                id: message.author.id,
                guild: message.guild.id,
                messages: 1,
                level: 0,
                cooldown: new Date().getTime()
            });
        else {
            if(new Date().getTime() - data.cooldown >= 10000) {
                data.messages += 1;
                data.cooldown = new Date().getTime();
            }

            if(data.messages % 200 == 0) {
                data.level += 1;
                if(options.ranking)
                    message.reply(
                        messages.nextLevel.replace('{}', data.level)
                    );
            }

            bot.users.updateOne({
                id: message.author.id,
                guild: message.guild.id
            }, {
                $set: data
            });
        }

        if(!message.content.startsWith(options.prefix))
            return;

        let args: string[] = message.content
            .substring(options.prefix.length)
            .split(' ');
        let name: string = args.shift().toLowerCase();
        let command: Command = bot.commands.find((c: Command): boolean =>
            c.info.names.includes(name)
        );

        if(command)
            command.run(message, args, messages);
        else message.react('❓');
    }
}
