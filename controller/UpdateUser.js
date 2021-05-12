const User = require('../model/User')
async function updateUser(account, update) {
    const user = await User.findOneAndUpdate({ account }, update)
    return user
}
module.exports = updateUser;