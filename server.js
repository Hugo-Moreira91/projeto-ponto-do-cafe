import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const dbUser = process.env.DB_USER;
const dbPassword = process.env.DB_PASSWORD;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;
const dbPort = process.env.DB_PORT;

const pool = mysql.createPool ({
    host: dbHost,
    user: dbUser,
    password: dbPassword,
    database: dbName,
    port: dbPort
});

app.post('/cadastrar', async (req, res) => {
    const { nome, email, endereco, numero, bairro, cidade, estado, username, senha} = req.body;

    const hashedSenha = await bcrypt.hash(senha, 10);

    try {
        const connection = await pool.getConnection();
        
        const query = `INSERT INTO usuarios (nome, email, endereco, numero, bairro, cidade, estado, username, senha) 
                       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;
        await connection.query(query, [nome, email, endereco, numero, bairro, cidade, estado, username, hashedSenha]);
        
        connection.release();
        res.status(200).json({ message: "Dados cadastrados com sucesso!" });
      } catch (error) {
        console.error("Erro ao cadastrar os dados:", error);
        res.status(500).json({ message: "Erro ao cadastrar os dados no banco de dados" });
      }
});