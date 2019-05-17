import Command from '../interfaces/command';
import { Message } from 'discord.js';
import bot from '..';

export default class PingCommand implements Command {
    info = {
        names: ['ping'],
        description: 'Shows bot ping',
        usage: '&ping'
    }

    run(message: Message): void {
        message.reply(`Pong! \`${Math.floor(bot.client.ping)}ms\``);
    }
}