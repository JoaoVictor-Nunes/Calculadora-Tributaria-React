# Configuração do Backend

## Pré-requisitos

1. MySQL instalado e rodando
2. Banco de dados `auth_db` criado (ou será criado automaticamente)

## Configuração do Banco de Dados

1. Abra o MySQL e crie o banco de dados:
```sql
CREATE DATABASE auth_db;
```

2. Configure as credenciais no arquivo `server.js`:
```javascript
const dbConfig = {
    host: 'localhost',
    user: 'root', 
    password: 'SUA_SENHA_AQUI', 
    database: 'auth_db'
};
```

## Como Rodar

### Terminal 1 - Backend (Node.js)
```bash
npm start
```
O servidor estará rodando em `http://localhost:3000`

### Terminal 2 - Frontend (React/Vite)
```bash
npm run dev
```
O frontend estará rodando em `http://localhost:5173`

## Endpoints Disponíveis

### POST /register
Registra um novo usuário
```json
{
  "username": "Nome do Usuário",
  "email": "email@example.com",
  "password": "senha123"
}
```

### POST /login
Faz login do usuário
```json
{
  "email": "email@example.com",
  "password": "senha123"
}
```

Retorna um token JWT que é armazenado no localStorage.

### GET /protected
Rota protegida que requer autenticação (token JWT no header Authorization)

## Notas Importantes

- O token JWT é armazenado no localStorage do navegador
- O token expira em 1 hora
- O CORS está configurado para permitir requisições do frontend na porta 5173
- A senha é armazenada em texto plano no banco (não recomendado para produção - use bcrypt)

