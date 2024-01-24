const Manager = require('../src/models/Manager')

const createManager = async () => {
    const doesAdminManagerExist = await Manager.findOne({ username: 'admin' })

    if (doesAdminManagerExist) return

    const manager = new Manager({
        username: 'admin',
        password:'admin',
        name: 'manager'
    })

    await manager.save()
}

module.exports = createManager