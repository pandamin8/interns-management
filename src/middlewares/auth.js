const jwt = require('jsonwebtoken')
const Student = require('../models/Student')
const Professor = require('../models/Professor')
const Manager = require('../models/Manager')

const auth = (type) => {
    return async (req, res, next) => {
        try {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, 'secret')

            let user

            if (type === 1)
                user = await Student.findOne({ _id: decoded._id, 'tokens.token': token })
            else if (type === 2)
                user = await Professor.findOne({ _id: decoded._id, 'tokens.token': token })
            else if (type === 3)
                user = await Manager.findOne({ _id: decoded._id, 'tokens.token': token })
            else 
                user = await checkLoggedInUser(decoded._id, token)
    
            if (!user) {
                throw new Error()
            }
            req.token = token
            req.user = user
            next()
        } catch (e) {
            res.status(401).send({ error: 'Please authenticate.', message: e.message })
        }
    }
}

const checkLoggedInUser = async (id, token) => {
    const student = await Student.findOne({ _id: id, 'tokens.token': token })
    if (student) return student

    const professor = await Professor.findOne({ _id: id, 'tokens.token': token })
    if (professor) return professor

    const manager = await Manager.findOne({ _id: id, 'tokens.token': token })
    if (manager) return manager

    return null
}

module.exports = auth