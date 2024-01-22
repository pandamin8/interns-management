const express = require('express')
const createManager = require('./utils/createManager')

require('./src/db/mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(require('./src/routers/student'))
app.use(require('./src/routers/user'))
app.use(require('./src/routers/manager'))
app.use(require('./src/routers/professor'))

createManager()

app.listen(port, () => {
    console.log('Server is on on port ' + port)
})

// const Task = require('./models/taskModel')
// const User = require('./models/userModel')

// const main = async () => {
//     const user = await findById()
// }