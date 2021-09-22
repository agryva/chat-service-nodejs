const express = require("express");
const socket = require("socket.io");
const cors = require('cors')

// App setup
const PORT = 5100;
const app = express();
const server = app.listen(PORT, function () {
    console.log(`Listening on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});
const {addUser, getUser, getUsers, removeUser} = require("./users");

app.use(cors())
// Static files
app.use(express.static("public"));

// Socket setup
const io = socket(server);

io.on('connection', socket => {

    socket.on('disconnect', () => {
        const user = getUser(socket.id)
        removeUser(socket.id)
        if (user) socket.leave(user.roomId);
    })

    socket.on('join_room', function ({username, roomId}, callback) {
        const {user, error} = addUser(socket.id, username, roomId)
        if (error) {
            socket.emit("join_room_error", error);
        } else {
            socket.join(user.roomId)
            socket.in(user.roomId).emit('notification', { title: 'Someone\'s here', description: `${user.username} just entered the room` })
            socket.emit('users', getUsers(user.roomId))
        }
    })

    socket.on('send_message', message => {
        const user = getUser(socket.id)
        console.log({socket_id: socket.id, user: user.username, text: message })
        io.in(user.roomId).emit('message', { user: user.username, text: message["message"] });
    })
});