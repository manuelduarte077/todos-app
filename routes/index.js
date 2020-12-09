const express = require('express')
const { getAllTodo, addNew, updateTodo, deleteTodo } = require('../controllers')

const routes = (app) => {
    const router = express.Router()
    app.use('/', router)

    router.get('/todos', async (req, res) => {
        
        let data = await getAllTodo()
        res.json(data)
        res.end()
    });

    router.post('/add', async (req, res) => {
        const { text } = req.body
        console.log('Aqui viene ' + text)
        let data = await addNew(text)
        if (data.error) {
            res.sendStatus(500)
        }

        res.json(data)
        res.end()

    });

    router.put('/todos/update/q', async (req, res) => {
        let { id, completed } = req.query
        let result = await updateTodo(id, completed)
        if(result.error) {
            res.sendStatus = 500
        }

        res.json(result)
        res.end()
    });

    router.delete('/todos/delete', async (req, res) => {
        let { id } = req.query
        let result = await deleteTodo(id)
        if(result.error) {
            res.sendStatus(500)
        }

        res.json(result)
        res.end()
    })
}


module.exports = routes