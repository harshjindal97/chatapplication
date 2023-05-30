const express = require('express');
const app = express();
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})

io.on('connection', (sockets) => {
    // console.log(sockets);
    console.log("user connected", sockets.id);

    sockets.on('join-room', (data, name) => {
        sockets.join(data);

        console.log(`${name} of id ${sockets.id} join ${data} room`)
    })

    sockets.on('send-message', (data) => {
        // console.log(data);

        sockets.to(data.room).emit('receive-message', data);

    })

    sockets.on("disconnect", () => {
        console.log('user disconnected', sockets.id)
    })
})


server.listen(3001, () => {
    console.log('server is working');
});