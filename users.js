let users = [];

function addUser(socketId, userName, roomId) {
    const user = {
        socketID: socketId,
        username: userName,
        roomId: roomId
    }

    const existingUser = users.find(s => s.username.trim().toLowerCase() === user.username.trim().toLowerCase() && s.roomId.trim().toLowerCase() === user.roomId.trim().toLowerCase())

    if (existingUser) return {error : "username already been taken"}

    users.push(user)

    console.log(users);

    return {user};
}

const getUser = id => {
    console.log(users);
    return users.find(user => user.socketID === id)
}

const getUsers = (room) => users.filter(user => user.roomId === room)

function removeUser(id) {
    const getId = users => users.socketID === id;
    const index = users.findIndex(getId);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

module.exports ={ addUser, removeUser, getUser, getUsers}