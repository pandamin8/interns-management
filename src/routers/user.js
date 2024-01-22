const express = require('express')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.get('/user/me', auth(4), async (req, res) => {
    res.send(req.user)    
})

router.post('/user/logout', auth(4), async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }  
})

router.post('/user/logoutAll', auth(4), async (req, res) => {

    try {
        req.user.tokens = []
        await req.user.save()
        res.send()
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router