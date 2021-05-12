const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({
    text: { type: String },
    createdAt: { type: String },
    time: { type: Number },
    room: { type: String },
    user: {
        _id: { type: Number },
        name: { type: String },
        avatar: { type: String },

    }
})
const Message = mongoose.model('Message', messageSchema)
module.exports = Message