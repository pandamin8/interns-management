const mongoose = require('mongoose')

mongoose.connect('mongodb://admin:%40minsPass@localhost:27017/' + process.env.DATABASE + '?authSource=admin')
