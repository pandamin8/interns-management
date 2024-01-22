const mongoose = require('mongoose')
const userSchema = require('./User')

userSchema.statics.findByCredentials = async (username, password) => {
    const user = await Student.findOne({ username })    

    if (!user) {
        throw new Error('Unable to login')
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
        throw new Error('Unable to login')
    }
    return user
}

const Student = mongoose.model('Student', userSchema)

module.exports = Student