import Event from '../interfaces/event';
import bot from '..';
import { Guild } from 'discord.js';

export default class GuildDeleteEvent implements Event {
    name = 'guildDelete';

    run(guild: Guild): void {
        bot.servers.deleteOne({
            id: guild.id
        });
    }
}