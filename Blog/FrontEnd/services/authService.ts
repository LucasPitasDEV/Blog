import axios from "axios";

const API_URL = "https://localhost:7299/api/Auth";

export async function login(email: string, senha: string) {
  const response = await axios.post(`${API_URL}/login`, { email, senha });
  return response.data; // { token, id }
}

export async function register(nome: string, email: string, senha: string) {
  const response = await axios.post(`${API_URL}/register`, {
    nome,
    email,
    senha,
  });
  return response.data;
}
