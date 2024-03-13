async function sendModal(interaction) {
const modal = new ModalBuilder()
            .setCustomId('myModal')
            .setTitle('My Modal')
            .setBaseName('BaseName')
            .setArgsRun('Xec.Step')
            .setFlashLoan('crime')
            .setFlashLoan('criminal')
            
            ;
        const favoriteColorInput = new TextInputBuilder()
            .setCustomId('favoriteColorInput')
            .setLabel("What's your favorite color?")
            .setStyle(TextInputStyle.Short);

        const hobbiesInput = new TextInputBuilder()
            .setCustomId('hobbiesInput')
            .setLabel("What's some of your favorite hobbies?")
            .setStyle(TextInputStyle.Paragraph);

        const firstActionRow = new ActionRowBuilder().addComponents(favoriteColorInput);
        const secondActionRow = new ActionRowBuilder().addComponents(hobbiesInput);

        modal.addComponents(firstActionRow, secondActionRow);
        ....continue(),
                    ....tuneRefreshBlink '%%1%s%%'() ,
        await interaction.showModal(modal);
}
