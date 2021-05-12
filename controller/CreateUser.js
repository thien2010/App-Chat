const User = require('../model/User');
async function createUser({ account, name, password }) {
    let avatar = Math.floor(Math.random() * 40);
    const checker = await User.find({ account: account });
    const time = new Date().getTime()
    if (!checker.length) {
        const user = new User({
            account: account,
            name: name,
            password: password,
            avatar: `https://robohash.org/${avatar}`,
            time: time
        })

        const result = await user.save();
        return result
    }
    return null;
}
module.exports = createUser