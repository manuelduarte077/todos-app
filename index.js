const path = require('path');
const express = require('express');

const routes = require('./routes');

const PORT = process.env.PORT || 3000

const app = express();
const MySQLManager = require('./db/connect')

// Crea la base de datos si no existe
new MySQLManager().createDataBase()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')));

routes(app)


app.listen(PORT, () => {
    console.info(`Server is running on PORT: ${PORT}`);
});