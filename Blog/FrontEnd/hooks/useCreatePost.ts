'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createPost } from "@/services/postService";

export function useCreatePost() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleCreatePost = async (titulo: string, conteudo: string) => {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");

      if (!token || !userId) {
        setError("Você precisa estar logado para criar uma postagem.");
        return;
      }

      await createPost(titulo, conteudo, userId, token);

      setSuccess("Postagem criada com sucesso!");
      router.push("/posts");
    } catch (err: any) {
      if (err.response?.data) {
        setError(
          err.response.data.message ||
            "Erro ao criar a postagem. Verifique os campos."
        );
      } else {
        setError("Ocorreu um erro. Verifique sua conexão com a API.");
      }
    } finally {
      setLoading(false);
    }
  };

  return { handleCreatePost, loading, error, success };
}
