const mysql = require('mysql');

const {db, dbName} = require('../config');

class MySQLManager {
    constructor () {
        this.client = mysql.createConnection(db);
        this.dbName = dbName;
        this.tableName = 'todos'
    }

    connect() { 
        this.client.connect(err => {
            if(err) {
                return err
            }
        })
    }

    getAll(){
    
        return new Promise((resolve, reject) => {
            this.client.query(`SELECT * FROM ${this.dbName}.${this.tableName} ORDER BY id DESC`, function(error, result) {
                if(error) {
                    reject(error)
                }
                resolve(result)
            });
        })

    }
    
    add(text) {
        return new Promise((resolve, reject) => {
            this.client.query(`INSERT INTO ${this.dbName}.${this.tableName} SET ?`, {text}, function(err, result) {
                if(err) {
                    reject(err)
                }
                resolve(result)
            });
        });
    }

    update(id, completed){
    
        return new Promise((resolve, reject) => {
            this.client.query(`UPDATE ${this.dbName}.${this.tableName} SET completed = ${completed} WHERE id = ${id}`, function(error, result) {
                if(error) {
                    reject(error)
                }
                resolve(result)
            });
        })

    }

    delete(id) {
        return new Promise((resolve, reject) => {
            this.client.query(`DELETE FROM ${this.dbName}.${this.tableName} WHERE id = ${id}`, function(error, result) {
                if(error) {
                    console.log(error.message)
                    reject(error)
                }

                resolve(result)
            });
        })
    }

    createDataBase() {
        this.client.query(`CREATE DATABASE IF NOT EXISTS ${this.dbName}`, (err) => {
            if(err) {
                console.log(err.message);
                return;
            }
            this.client.query(`CREATE TABLE IF NOT EXISTS ${this.dbName}.${this.tableName} (
                id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
                text VARCHAR(255) NOT NULL,
                completed BOOL DEFAULT FALSE)`, (err) => {
                if(err) {
                    console.log(err.message)
                    return;
                }
            })

            console.log('Data Base is created');
            
        })

    }

  
}

module.exports = MySQLManager