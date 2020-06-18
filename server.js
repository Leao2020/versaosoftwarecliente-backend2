const express = require('express');
const Pool = require('pg').Pool;
const cors = require('cors');

const pool = new Pool({
    user: 'nejmigckrljava',
    password: '4ba11c6ac78f80a0e908738c9b388d63e357d7b17044cd9a7afd7dca19656dec',
    host: 'ec2-34-193-117-204.compute-1.amazonaws.com',
    database: 'dcor1lesmje80l',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const server = express();

server.use(cors());

server.use(express.json());

server.get('/softwares', async function(request, response) {
    const result = await pool.query('SELECT * FROM softwares');
    return response.json(result.rows);
})

server.get('/softwares/:id', async function(request, response) {
    const id = request.params.id;
    const sql = 'SELECT * FROM softwares WHERE id = $1'
    const result = await pool.query(sql, [id]);
    return response.json(result.rows);
})

server.post('/softwares', async function(request, response) {
    const cliente = request.body.cliente; // JSON
    const app = request.body.app;
    const versao = request.body.versao;
    const sql = `INSERT INTO softwares (cliente, app, versao) VALUES ($1, $2, $3)`;
    await pool.query(sql, [cliente, app, versao]);
    return response.status(204).send();
})

server.delete('/softwares/:id', async function(request, response) {
    const id = request.params.id;
    const sql = `DELETE FROM softwares WHERE id = $1`;
    await pool.query(sql, [id]);
    return response.status(204).send();
})

server.put('/softwares/:id', async function(request, response) {
    const id = request.params.id;
    const { cliente, app, versao } = request.body;

    const sql = `UPDATE softwares SET cliente = $1, app = $2, versao = $3 WHERE id = $4`;
    await pool.query(sql, [cliente, app, versao, id]);
    
    return response.status(204).send();
})


server.listen(process.env.PORT || 3000);
