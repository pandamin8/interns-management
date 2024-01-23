const express = require('express')
const auth = require('../middlewares/auth')
const Professor = require('../models/Professor')

const router = new express.Router()

router.get('/professors', auth(3), async (req, res) => {
    try {
        const professors = await Professor.find()
        res.send(professors)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/professor/register', auth(3), async (req, res) => {
    const professor = new Professor(req.body)

    try {
        await professor.save()
        const token = await professor.generateAuthToken()
        res.status(201).send({ professor, token })
    } catch (e) {
        res.status(400).send(e)
    }    
})

router.post('/professor/login', async (req, res) => {
    try {
        const professor = await Professor.findByCredentials(req.body.username, req.body.password)
        const token = await professor.generateAuthToken()
        res.send({ professor, token })
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: e.message })
    }
})

router.patch('/professors/update', auth(3), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'username', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        
        const professor = req.user
        updates.forEach((update) => professor[update] = req.body[update])            
        res.send(professor)
        
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
})

router.delete('/professor/delete', auth(3), async (req, res) => {
    
    try {        
        await req.user.remove()
        res.send(req.user)
    } catch (e){
        res.status(500).send(e)
    }
})

module.exports = router