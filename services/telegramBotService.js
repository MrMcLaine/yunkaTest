const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const botUsername = process.env.BOT_USERNAME;

function generateInviteLink(telegramUsername) {
    return `https://t.me/${botUsername}?start=${telegramUsername}`;
}

async function botMessage() {
    const bot = new TelegramBot(process.env.BOT_API_TOKEN, {polling: true});

    bot.onText(/\/start/, async (msg) => {
        const chatId = msg.chat.id;
        const firstName = msg.from.first_name;

        try {
            const welcomeMessage = `Hello, ${firstName}! Я бот сайту Юнки. Буду сповіщати тебе про новини з нашого сайту`;

            // Create the inline keyboard with two buttons
            const inlineKeyboard = {
                inline_keyboard: [
                    [
                        {
                            text: 'View 5 Last Projects',
                            callback_data: 'view_projects',
                        },
                        {
                            text: 'View 5 Last Blogs',
                            callback_data: 'view_blogs',
                        },
                    ],
                ],
            };

            // Send the welcome message with the inline keyboard
            await bot.sendMessage(chatId, welcomeMessage, {
                reply_markup: inlineKeyboard,
            });
        } catch (error) {
            console.error('Error sending welcome message:', error.message);
        }
    });

    bot.on('callback_query', async (query) => {
        const chatId = query.message.chat.id;
        const data = query.data;

        // Handle the button click events
        switch (data) {
            case 'view_projects':
                console.log('view_projects');

                break;

            case 'view_blogs':
                console.log('view_blogs');
                try {
                    // Retrieve the 5 last blogs from your backend API
                    const response = await axios.get(`http://localhost:3000/api/blogs`);
                    const blogs = response.data.data.slice(-5); // Get the last 5 blogs

                    // Send the blogs to the user
                    for (const blog of blogs) {
                        const caption = `${blog.title}: ${blog.description}`;
                        await bot.sendPhoto(chatId, blog.imageUrl, {caption});
                    }
                } catch (error) {
                    console.error('Error retrieving blogs:', error.message);
                }
                break;


            default:
                break;
        }
    });
}

module.exports = {
    generateInviteLink,
    botMessage
};
