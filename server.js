const express = require('express')
const createManager = require('./utils/createManager')
const cors = require('cors');

const dotenv = require('dotenv')
dotenv.config()

require('./src/db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())

app.use(express.json())
app.use(require('./src/routers/student'))
app.use(require('./src/routers/user'))
app.use(require('./src/routers/manager'))
app.use(require('./src/routers/professor'))
app.use(require('./src/routers/request'))

createManager()

app.listen(port, () => {
    console.log('Server is on on port ' + port)
})

// const Task = require('./models/taskModel')
// const User = require('./models/userModel')

// const main = async () => {
//     const user = await findById()
// }