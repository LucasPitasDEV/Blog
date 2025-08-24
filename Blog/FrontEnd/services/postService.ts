
import axios from "axios";

const API_URL = "https://localhost:7299/api/posts";

export async function getPosts(token: string) {
  const response = await axios.get(API_URL, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function getPostById(id: number, token: string) {
  const response = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
}

export async function createPost(titulo: string, conteudo: string, userId: number, token: string) {
  const response = await axios.post(
    API_URL,
    { titulo, conteudo, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}

export async function updatePost(
  id: number,
  titulo: string,
  conteudo: string,
  userId: number,
  token: string
) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    { titulo, conteudo, userId },
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return response.data;
}


export async function deletePost(id: number, token: string) {
  await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
}
