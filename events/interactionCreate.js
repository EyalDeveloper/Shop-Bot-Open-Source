
module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {
    if (!interaction.guild) return;
    if (!interaction.isButton()) return;
  }
}
