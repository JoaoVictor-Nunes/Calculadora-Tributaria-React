import usersData from '../dados/users.json';

export const userService = {
  // Verifica se email já está cadastrado
  checkEmailExists: (email) => {
    return usersData.users.some(user => user.email === email);
  },

  // Valida login
  validateLogin: (email, password) => {
    return usersData.users.find(user => 
      user.email === email && user.password === password
    );
  },

  // Adiciona novo usuário 
  addUser: (userData) => {
    const newUser = {
      id: usersData.users.length + 1,
      ...userData
    };
    usersData.users.push(newUser);
    return newUser;
  },

  // Busca usuário por email
  getUserByEmail: (email) => {
    return usersData.users.find(user => user.email === email);
  }
};