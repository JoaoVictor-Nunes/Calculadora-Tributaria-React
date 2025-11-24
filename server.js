import express from 'express';
import jwt from 'jsonwebtoken';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const PORT = 3000;
const SECRET_KEY = '847504968901ce55ef28d6a7fa24b568c6966734'

// Configurar CORS para permitir requisições do frontend
app.use(cors({
  origin: 'http://localhost:5173', // Porta padrão
  credentials: true
}));

app.use(express.json());

// Configuração do MySQL
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: 'M1nhaSenhaMS', 
    database: 'auth_db'
};

const pool = mysql.createPool(dbConfig);

// Inicializar banco de dados
// Inicializar banco de dados
async function initializeDatabase() {
    try {
        const connection = await pool.getConnection();
        
        // Primeiro, dropar a tabela se existir (opcional - cuidado em produção!)
        await connection.execute('DROP TABLE IF EXISTS users');
        
        // Criar tabela com todas as colunas
        await connection.execute(`
            CREATE TABLE users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                username VARCHAR(255) NOT NULL,
                profissao VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        `);
        
        connection.release();
        console.log('Tabela users criada com todas as colunas!');
    } catch (error) {
        console.error('Erro ao inicializar banco:', error);
    }
}

initializeDatabase();

// Rotas

// LOGIN DO USUARIO
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const [users] = await pool.execute(
            'SELECT * FROM users WHERE email = ? AND password = ?',
            [email, password]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Email ou senha inválidos!' });
        }

        const user = users[0];
        const token = jwt.sign({ 
            id: user.id,        
            username: user.username, 
            email: user.email
            // REMOVER password do token!
        }, SECRET_KEY, { expiresIn: '1h' }); 
        
        res.status(200).json({ 
            message: 'Autenticação realizada!', 
            token: token,
            user: {  
                id: user.id,
                username: user.username,
                email: user.email
            }
        });

    } catch (error) {
        console.error('Erro no login:', error);
        res.status(500).json({ message: 'Erro interno do servidor' });
    }
});

// REGISTRO DO USUARIO
app.post('/register', async (req, res) => {
    try {
        const { username, profissao, email, password } = req.body;

        const [existingUsers] = await pool.execute(
            'SELECT id FROM users WHERE email = ?',
            [email]
        );

        if (existingUsers.length > 0) {
            return res.status(409).json({ message: 'Email já cadastrado!' });
        }

        const [result] = await pool.execute(
            'INSERT INTO users (username, profissao, email, password) VALUES (?, ?, ?, ?)',
            [username, profissao, email, password]
        );

        res.status(201).json({ 
            message: 'Usuário cadastrado com sucesso!',
            userId: result.insertId 
        });

    } catch (error) {
        console.error('Erro detalhado no registro:', error);
        res.status(500).json({ 
            message: 'Erro interno do servidor',
            error: error.message // ← Mostra o erro específico
        });
    }
});

// Middleware e outras rotas permanecem iguais...
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) {
        return res.status(403).json({ message: 'Token não fornecido!' });
    }
    
    jwt.verify(token, SECRET_KEY, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido!' });
        }
        req.user = user;
        next();
    });
}

app.get('/protected', authenticateToken, (req, res) => {
    res.status(200).json({ 
        message: 'Acesso autorizado à rota protegida!',
        user: req.user 
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});