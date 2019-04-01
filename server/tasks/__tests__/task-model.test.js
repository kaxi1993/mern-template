const Task = require('../task-model')

describe('Task Model Tests', () => {
    describe('preUpdate Tests', () => {
        test('it should execute preUpdate hook successfully', () => {
            const task = new Task()

            const updateMock = jest.fn()

            task.update = updateMock

            task.preUpdate()

            expect(updateMock.mock.calls.length).toBe(1)
        })
    })
})
