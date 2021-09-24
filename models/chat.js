const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let chatSchema = new mongoose.Schema({
    socket_id: {
        type: String
    },
    username: {
        type: String
    },
    room: {
        type: String
    },
    text: {
        type: String
    }
}, {
    timestamps: true
})

module.exports = mongoose.model("chat", chatSchema, "chat")
