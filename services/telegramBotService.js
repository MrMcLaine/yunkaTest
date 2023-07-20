
const botUsername = process.env.BOT_USERNAME;

function generateInviteLink(telegramUsername) {
    return `https://t.me/${botUsername}?start=${telegramUsername}`;
}

module.exports = {
    generateInviteLink,
};
