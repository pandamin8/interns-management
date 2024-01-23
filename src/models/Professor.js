const mongoose = require('mongoose')
const userSchema = require('./User')
const bcrypt = require('bcrypt')

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await Professor.findOne({ username })    

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

const Professor = mongoose.model('Professor', userSchema)

module.exports = Professor
