const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http);
const cors = require('cors')
const {addUser, getUser, getUsers, removeUser} = require("./users");
const {get} = require("http");

app.use(cors())

app.get('/', (req, res) => {
    res.send("Vouch Chat Server Running :)")
    console.log("ada yang konek");
})

io.on('connection', socket => {

    socket.on('disconnect', () => {
        // socket.leave(chatID)
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

http.listen(8080)