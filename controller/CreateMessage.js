const Message = require('../model/Message');
async function createMessageToDb(userParam) {
    const message = new Message({
        text: userParam.text,
        createdAt: userParam.createdAt + "",
        time: parseInt(userParam.time),
        room: userParam.room,
        user: {
            _id: userParam.user._id,
            name: userParam.user.name,
            avatar: userParam.user.avatar,

        }

    })
    await message.save();

}
module.exports = createMessageToDb