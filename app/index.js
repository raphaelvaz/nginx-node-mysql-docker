const express = require("express");
const util = require('util');
const app = express();
const port = 3000;

const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database:'nodedb'
};
const mysql = require('mysql');
const insert = "INSERT INTO people(name) VALUES ('raphaelzinho')"
const select = "SELECT * FROM people;";

app.get('/', async (_,res) => {
    const connection = mysql.createConnection(config);
    const query = util.promisify(connection.query).bind(connection);
    await query(insert);
    const rows = await query(select);
    connection.end();
    const text = ['<h1>nomes e nomes</h1>'];
    text.push(...rows.map((row) => (`<h2>${row.name}</h2>`)));
    res.send(text.join());
});

app.listen(port, () => {
    console.log("listen on port 3000");
});