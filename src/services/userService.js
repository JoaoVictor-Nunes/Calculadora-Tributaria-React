export const userService = {
  checkEmailExists: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.some(user => user.email === email);
  },

  addUser: (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString()
      };
      
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      console.log('Usuário salvo no localStorage:', newUser);
      return newUser;
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      throw error;
    }
  },

  validateLogin: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => 
      user.email === email && user.password === password
    );
  },

  getUserByEmail: (email) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users.find(user => user.email === email);
  }
};