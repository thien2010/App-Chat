const User = require('../model/User');
async function getUser({ account, password }) {
    const user = await User.find({ account: account, password: password });
    return user
}
module.exports = getUser;