import express from 'express';
import { createConnection } from 'mysql2';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

const db = createConnection({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName
});

db.connect((err) => {
    if(err) {
        console.error('Erro ao conectar ao MySQL:', err);
        return;
    }
    console.log('Conectado ao MySQL');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/cadastro_usuarios', async (req, res) => {
    const { nome, email, endereco, numero, bairro, cidade, estado, username, senha} = req.body;

    const hashedSenha = await bcrypt.hash(senha, 10);

    const sql = `INSERT INTO usuarios (nome, email, endereco, numero, bairro, cidade, estado, username, senha) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    db.query(sql, [nome, email, endereco, numero, bairro, cidade, estado, username, hashedSenha], (err, result) => {
        if(err) {
            return res.status(500).send('Erro ao cadastrar usuário.');
        }
        res.status(201).send('Usuário cadastrado com sucesso!');
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));