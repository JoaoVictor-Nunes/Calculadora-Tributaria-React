export const userService = {
  // Verifica se um email já está cadastrado no sistema
  checkEmailExists: (email) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      return users.some(user => user.email === email);
    } catch (error) {
      console.error('Erro ao verificar email:', error);
      return false;
    }
  },

  // Adiciona um novo usuário ao sistema
  addUser: (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Gera ID único baseado no timestamp
      const newUser = {
        id: Date.now().toString(), // ID único baseado no timestamp
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      return newUser;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  },

  // Valida as credenciais de login do usuário
  validateLogin: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => 
      user.email === email && user.password === password
    );
  },

  // Busca usuário pelo email
  getUserByEmail: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email);
  }
};