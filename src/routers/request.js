const express = require('express')
const auth = require('../middlewares/auth')
const Request = require('../models/Request')

const router = new express.Router()

router.post('/request', auth(1), async (req, res) => {
    try {
        const request = new Request({
            description: req.body.description,
            owner: req.user._id
        })

        await request.save()
        res.send(request)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }       
})

router.get('/requests', auth(3), async (req, res) => {
    try {
        const requests = await Request.find({}).populate('owner')
        res.send(requests)
    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.patch('/request/:id/result', auth(2), async (req, res) => {
    try {
        const request = await Request.findById(req.params.id)

        if (request.checked)
            return res.status(200).send({ message: 'you can\'t edit your response' })

        request.accepted = req.body.accepted
        request.checked = true

        await request.save()

        res.send({ message: 'request edited' })

    } catch (e) {
        res.status(500).send({ message: e.message })
    }
})

router.get('/requests/notchecked', auth(2), async (req, res) => {
    try {
        const requests = await Request.find({ checked: false })
        res.send(requests)
    } catch (e) {
        res.status(500).send({ message: e.message })
    } 
})

router.patch('/request/:id', auth(3), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'accepted']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        
        const request = await Request.findById(req.params.id)
        updates.forEach((update) => request[update] = req.body[update]) 
        await request.save()           
        res.send(request)
        
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
})

router.get('/requests/my', auth(1), async (req, res) => {
    try {
        const requests = await Request.find({ owner: req.user._id })
        res.send(requests)
    } catch (e) {
        res.status(500).send({ message: e.message })
    } 
})


module.exports = router