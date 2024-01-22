const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const userSchema = require('./User')

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await Manager.findOne({ username })    

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

const Manager = mongoose.model('Manager', userSchema)

module.exports = Manager
