import Command from '../interfaces/command';
import { Message, RichEmbed } from 'discord.js';
import bot from '..';
import Messages from '../interfaces/messages';
const { dashboard, invite }: { dashboard: string, invite: string } = require('../../config.json');

export default class HelpCommand implements Command {
    info = {
        names: ['help'],
        description: 'Information about the bot and commands',
        usage: '&help',
        category: 'tool'
    };

    run(message: Message, _args: string[], messages: Messages): void {
        message.channel.send(new RichEmbed()
            .setTitle(messages.help)
            .setColor('RANDOM')
            .setDescription(messages.helpDescription)
            .setURL(`${dashboard}/commands`)
            .setThumbnail(bot.client.user.avatarURL)
            .addField('Webpanel', dashboard)
            .addField(messages.communityServer, 'https://discord.gg/kDgxGQ6')
            .addField(messages.developers, '<@372459063339909120>\n<@271728660963262464>')
            .addField('Invitelink', invite)
            .setFooter(
                `${messages.requestedBy} ${message.member.displayName}`,
                message.author.avatarURL
            )
        );
    }
}