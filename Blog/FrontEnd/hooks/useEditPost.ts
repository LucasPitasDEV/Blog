'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPostById, updatePost, deletePost } from "@/services/postService";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorNome: string;
  dataCriacao: string;
}

export function useEditPost(id: string) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const post: Post = await getPostById(id, token);
        setTitle(post.titulo);
        setContent(post.conteudo);
      } catch {
        setError("Erro ao carregar a postagem para edição.");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchPost();
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("id");
      if (!token || !userId) {
        setError("Você precisa estar logado para editar.");
        return;
      }

      await updatePost(id, title, content, userId, token);
      setSuccess("Postagem atualizada com sucesso!");
      router.push("/posts");
    } catch {
      setError("Erro ao atualizar a postagem.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Tem certeza que deseja deletar esta postagem?")) return;

    setError("");
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Você precisa estar logado para deletar.");
        router.push("/auth/login");
        return;
      }

      await deletePost(id, token);
      setSuccess("Postagem deletada com sucesso!");
      router.push("/posts");
    } catch {
      setError("Erro ao deletar a postagem.");
    } finally {
      setLoading(false);
    }
  };

  return {
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    success,
    handleUpdate,
    handleDelete,
  };
}
