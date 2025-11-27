// Configuração da API base
const API_BASE_URL = 'http://localhost:3000';


 // Função genérica para fazer requisições HTTP
async function apiRequest(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Adicionar token de autenticação se existir
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
}


 // Serviço de autenticação 
export const authService = {
  
// Registra um novo usuário
async register(username, profissao, email, password) {

  // Criar objeto limpo para garantir que não há propriedades circulares
  const requestBody = {
    username: username,
    profissao: profissao,
    email: email,
    password: password
  };

  return apiRequest('/register', {
    method: 'POST',
    body: JSON.stringify(requestBody),
  });
},


   // Faz login do usuário
  async login(email, password) {
    const response = await apiRequest('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    // Salvar token no localStorage
    if (response.token) {
      localStorage.setItem('token', response.token);
    }

    return response;
  },

   // Faz logout (remove o token)   
  logout() {
    localStorage.removeItem('token');
  },

   // Verifica se o usuário está autenticado   
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  
   // Obtém o token armazenado
  getToken() {
    return localStorage.getItem('token');
  },
};

export default apiRequest;

