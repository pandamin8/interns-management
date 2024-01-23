const express = require('express')
const Student = require('../models/Student')
const auth = require('../middlewares/auth')
const router = new express.Router()

router.get('/students', auth(3), async (req, res) => {
    try {
        const students = await Student.find()
        res.send(students)
    } catch (e) {
        res.status(400).send(e)
    }
})


router.post('/student/register', auth(3), async (req, res) => {
    const student = new Student(req.body)

    try {
        await student.save()
        const token = await student.generateAuthToken()
        res.status(201).send({ student, token })
    } catch (e) {
        res.status(400).send(e)
    }    
})

router.post('/student/login', async (req, res) => {
    try {
        const student = await Student.findByCredentials(req.body.username, req.body.password)
        const token = await student.generateAuthToken()
        res.send({ student, token })
    } catch (e) {
        console.log(e)
        res.status(400).send({ message: e.message })
    }
})

router.patch('/students/update', auth(3), async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'username', 'password']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates' })
    }

    try {
        
        const student = req.user
        updates.forEach((update) => student[update] = req.body[update])            
        res.send(student)
        
    } catch (e) {
        res.status(500).send()
        console.log(e)
    }
})

router.delete('/student/delete', auth(3), async (req, res) => {
    
    try {        
        await req.user.remove()
        res.send(req.user)
    } catch (e){
        res.status(500).send(e)
    }
})

module.exports = router