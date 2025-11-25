import { authService } from "./api";

const API_BASE_URL = 'http://localhost:3000';

export const userService = {
  async checkEmailExists(email) {
    return false;
  },

  async addUser(userData) {
    try {
      const userDataClean = {
        name: userData.name || userData.username,
        profissao: userData.profissao,
        email: userData.email,
        password: userData.password,
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
        ...response,
      };
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
      throw error;
    }
  },

  async sendPasswordResetLink(email) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/send-reset-link`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Email não encontrado");
      }

      return response.json();
    } catch (error) {
      throw error;
    }
  },

  async validateLogin(email, password) {
    try {
      const response = await authService.login(email, password);

      if (response.token) {
        const tokenParts = response.token.split(".");
        const payload = JSON.parse(atob(tokenParts[1]));

        return {
          id: payload.id,
          username: payload.username,
          email: payload.email,
          token: response.token,
        };
      }

      return null;
    } catch (error) {
      console.error("Erro no login:", error);
      return null;
    }
  },

  async getUserByEmail(email) {
    return null;
  },
};