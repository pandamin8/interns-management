const express = require('express')
const auth = require('../middlewares/auth')
const Manager = require('../models/Manager')

const router = new express.Router()


router.post('/manager/login', async (req, res) => {
    try {
        const manager = await Manager.findByCredentials(req.body.username, req.body.password)
        const token = await manager.generateAuthToken()
        res.send({ manager, token })
    } catch (e) {
        res.status(400).send({ message: e.message })
    }
})

module.exports = router