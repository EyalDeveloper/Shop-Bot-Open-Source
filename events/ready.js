const chalk = require('chalk');
const request = require('request');
const mongoose = require('mongoose');

module.exports = {
  name: 'ready',
  execute(client) {

    if(!client.config.database) return;
    mongoose.connect(client.config.database, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(() => {
      console.log(chalk.cyan('[LOG]') + chalk.white(' The client is connected to the database!'))
      console.log(chalk.cyan('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

    }).catch((err) => {
      console.log(chalk.cyan('[LOG]') + chalk.white(` ${err}`))
      console.log(chalk.cyan('=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+='))

    })
    console.log(chalk.cyan('Name: ') + chalk.white(`${client.user.username}`))
    console.log(chalk.cyan('Bot Status: ') + chalk.white('Initialized'))

    //Customers List in the bot status starting from here :)

    const customersRole = client.guilds.cache.get(client.config.guildId).roles.cache.find(role => role.name === 'Customers');
    setInterval(() => {
      const customers = customersRole.members.size;
      const memberscount = client.guilds.cache.get(client.config.guildId).memberCount
      client.user.setActivity(`${memberscount} Members. | ${customers} Customers.`, {type: 'WATCHING'});
  }, 20000)
  },
};