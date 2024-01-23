const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    accepted: {
        type: Boolean,
        optional: true,
        default: false
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'                
    },
    checked: {
        type: Boolean,
        optional: true,
        default: false        
    }
}, {
    timestamps: true
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request