const User = require('../models/userModel');

// let lastUserId = 0

const findLastUserId = async () => {
    const lastUser = await User.findOne({}, { bPluginsID: 1, _id: 0 })
        .sort({
            createdAt: -1,
        })
        .lean()

    return lastUser?.bPluginsID
}

const generateUserId = async () => {
    const currentId = (await findLastUserId()) || (0).toString().padStart(5, '0')

    //increment by 1
    const incrementedId = (parseInt(currentId) + 1).toString().padStart(5, '0')
    
    return incrementedId
}

module.exports = { generateUserId }