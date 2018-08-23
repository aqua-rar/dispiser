module.exports = token => {
  const discord = require('discord.js')
  const client = new discord.Client()

  client.login(token)

  client.on('ready', () => {
    for (let [guildID, guild] of client.guilds) {
      let node = document.createElement('div')
      let abbr = document.createElement('abbr')
      let img = document.createElement('img')
      img.src = guild.iconURL
      abbr.title = guild.name
      node.onclick = () => setGuild(guildID)
      abbr.appendChild(img)
      node.appendChild(abbr)
      document.querySelector('#guilds').appendChild(node)
    }
  })

  function setGuild (guildID) {
    var guild = client.guilds.get(guildID)
    var channelList = document.querySelector('#channels')
    while (channelList.firstChild) {
      channelList.removeChild(channelList.firstChild)
    }
    for (let [channelID, channel] of guild.channels) {
      if (channel.type !== 'text') continue
      let node = document.createElement('p')
      node.textContent = channel.name
      node.onclick = () => setChannel(guildID, channelID)
      channelList.appendChild(node)
    }
  }

  function setChannel (guildID, channelID) {
    var guild = client.guilds.get(guildID)
    var channel = guild.channels.get(channelID)
    channel.fetchMessages()
      .then(messages => {
        var messageList = document.querySelector('#messages')
        while (messageList.firstChild) {
          messageList.removeChild(messageList.firstChild)
        }
        for (let [, message] of messages) {
          let node = document.createElement('div')
          let m = document.createElement('p')
          m.textContent = `${message.author.tag}: ${message.content}`
          let t = document.createElement('p')
          t.textContent = message.createdAt
          node.appendChild(t)
          node.appendChild(m)
          messageList.appendChild(node)
        }
      })
  }
}
