const {SlashCommandBuilder} = require('@discordjs/builders');
const {MessageEmbed} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('customers-list')
    .setDescription('Show a list of the customers'),
  async execute(interaction) {
    const customersRole = interaction.guild.roles.cache.find(role => role.name === 'Customers');
    const customerCount = customersRole.members.size;
    const customers = customersRole.members.map(member => `• ${member} - ${member.user.tag} (${member.id})`).join('\n');
    const embed = new MessageEmbed()
      .setTitle(`Customers [${customerCount}]`)
      .setDescription(customers)
      .setThumbnail(interaction.guild.iconURL({dynamic: true}))
      .setColor('BLUE')
      .setAuthor(interaction.guild.name, interaction.guild.iconURL({ dynamic: true }))
      .setFooter(`Last updated at`, interaction.guild.iconURL({ dynamic: true }))
      .setTimestamp();
    
    const reply = await interaction.channel.send({ embeds: [embed] });

    setInterval(() => {
      const customers = customersRole.members.map(member => `• ${member} - ${member.user.tag} (${member.id})`).join('\n');
      const updatedCount = customersRole.members.size;
      embed.setTitle(`Customers [${updatedCount}]`);
      embed.setDescription(customers);
      reply.edit({ embeds: [embed] });
    }, 20000);
  }
};
