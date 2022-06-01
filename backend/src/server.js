// import other libraries as CJS
const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const port = 4000

import { faker } from '@faker-js/faker';

const main = async () => {
  // import geckos as ESM

  let players = {}

  const { geckos } = await import('@geckos.io/server');


  const io = geckos()

  io.addServer(server)
  io.onConnection(channel => {
    let randomName = faker.name.findName();

    players[channel.id] = {
      playerId: channel.id,
      name: randomName,
    }

    channel.room.emit('currentPlayers', players)

    channel.on('message', (data) => {
      const obj = { name: players[channel.id].name, message: data.message }
      channel.room.emit('message-for-all', obj)
    })

    channel.onDisconnect(() => {
      delete players[channel.id];
      console.log(`${channel.id} got disconnected`)
      channel.room.emit('currentPlayers', players);
    })

  })

  server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
}

main()
