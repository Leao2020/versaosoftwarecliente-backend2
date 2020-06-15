//yarn add pg

const Pool = require('pg').Pool;

// 1- Abrir a conexão
// 2 Executar o comando SQL (query, insert) 30ms (índice)
// 3 Fechar a conexão

const pool = new Pool({
    user: 'nejmigckrljava',
    password: '4ba11c6ac78f80a0e908738c9b388d63e357d7b17044cd9a7afd7dca19656dec',
    host: 'ec2-34-193-117-204.compute-1.amazonaws.com',
    database: 'dcor1lesmje80l',
    port: 5432,
    ssl: { rejectUnauthorized: false }
});

const sql = `
    CREATE TABLE IF NOT EXISTS softwares
    (
     ID serial primary key,
     cliente varchar(200) not null,
     app varchar(200) not null,
     versao varchar(200) not null
    )
`;

//pool.query(sql, function(error, result) {
//     if(error)
//        throw error
//    console.log('Tabela criada com sucesso');
//})


//INSERT
const sql_insert = `
        INSERT INTO softwares (cliente, app, versao) 
            VALUES ('Fudo de Quintal ME', 'Master Control', '1.1')
`;

pool.query(sql_insert, function(error, result) {
    if(error)
        throw error;

        console.log(result.rowCount);
})

//SELECT

//const sql_select = `SELECT * FROM softwares`;

//pool.query(sql_select, function(error, result)  {
//    if (error)
//        throw error;

//    console.log(result.rows);
//})