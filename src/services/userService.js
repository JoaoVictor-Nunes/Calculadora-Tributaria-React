import { authService } from './api';

export const userService = {
  // Verifica se um email já está cadastrado no sistema
  // Nota: Esta função não é mais necessária pois o backend já valida isso
  // Mantida para compatibilidade, mas retorna sempre false
  async checkEmailExists(email) {
    // A verificação será feita no momento do registro pelo backend
    return false;
  },

  // Adiciona um novo usuário ao sistema via backend
 async addUser(userData) {
  try {
    // Extrair apenas os dados necessários para evitar objetos circulares
    const userDataClean = {
      name: userData.name || userData.username,
      profissao: userData.profissao,
      email: userData.email,
      password: userData.password
    };

    const response = await authService.register(
      userDataClean.name,
      userDataClean.profissao,
      userDataClean.email,
      userDataClean.password
    );
    
    return {
      id: response.userId,
      username: userDataClean.name,
      email: userDataClean.email,
      profissao: userDataClean.profissao,
      ...response
    };
  } catch (error) {
    console.error('Erro ao salvar usuário:', error);
    throw error;
  }
},

  // Valida as credenciais de login do usuário via backend
  async validateLogin(email, password) {
    try {
      const response = await authService.login(email, password);
      
      // Decodificar o token para obter informações do usuário
      if (response.token) {
        const tokenParts = response.token.split('.');
        const payload = JSON.parse(atob(tokenParts[1]));
        
        return {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          token: response.token
        };
      }
      
      return null;
    } catch (error) {
      console.error('Erro no login:', error);
      return null;
    }
  },

  // Busca usuário pelo email (não disponível no backend atual)
  async getUserByEmail(email) {
    // Esta funcionalidade não está disponível no backend atual
    // Retornar null ou implementar uma rota no backend se necessário
    return null;
  }
};