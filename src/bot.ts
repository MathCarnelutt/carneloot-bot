import { Bot } from 'grammy';

import { AddTimeCommand } from './commands/add-time.command';
import { PingCommand } from './commands/ping.command';

import { AuthMiddleware } from './middlewares/auth.middleware';
import { GenericErrorMiddleware } from './middlewares/generic-error.middleware';

const { BOT_TOKEN, WEBHOOK_URL } = process.env;

export const createBot = () => {
    if (!BOT_TOKEN) {
        throw new Error('Missing BOT_TOKEN');
    }

    const bot = new Bot(BOT_TOKEN);

    bot.use(GenericErrorMiddleware);

    bot.use(AuthMiddleware);

    bot.command('hello', ctx => ctx.replyWithPhoto('https://i.kym-cdn.com/photos/images/original/001/475/422/473.jpg'));

    bot.command('ping', PingCommand);

    bot.command('add', AddTimeCommand);

    return bot;
}

export const setWebhook = (bot: Bot, url = WEBHOOK_URL ?? '') => bot.api.setWebhook(url)

export const onStart = async (bot: Bot) => {
    await bot.api.setMyCommands([
        { command: 'ping', description: 'Pongs you!' },
        { command: 'hello', description: 'Hi 😊' },
        { command: 'add', description: 'Adds timesheet entry' },
    ]);
}
