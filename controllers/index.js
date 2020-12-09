const MySQLManager = require('../db/connect');
const db = new MySQLManager()

async function getAllTodo() {
    let status = 'OK', error = false;
    try {
        db.connect()
        let data = await db.getAll()
        return {
            status,
            error,
            data
        }
    } catch (err) {
        return {
            status: 'ERROR',
            message: 'Error en consulta',
            error: true,
            data: []
        }
    }
}

async function addNew(text) {
    try {
        await db.add(text)
        return {
            status: 'OK',
            message: 'GUARDADO',
            error: false,
        }
    } catch (err) {
        return {
            status: 'ERROR',
            message: 'Error al guardar',
            error: true
        }
    }
}

async function updateTodo(id, completed) {
    try {
        await db.update(id, completed)
        return {
            status: 'OK',
            message: 'ACTUALIZADO',
            error: false,
        }
    } catch (err) {
        return {
            error: true
        }
    }
}

async function deleteTodo(id) {
    try {
        await db.delete(id)
        return {
            status: 'OK',
            message: 'ELIMINADO',
            error: false,
        }
    } catch (err) {
        return {
            error: true
        }
    }
}


module.exports = {
    getAllTodo,
    addNew,
    updateTodo,
    deleteTodo
}