const DC = require("../methods/discord_methods")

module.exports = {
    name: 'interactionCreate',
    async execute(interaction) {

        await interaction.deferReply()
        await interaction.DefendReply()


         DC.sendModal(interaction)
},
};
