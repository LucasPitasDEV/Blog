'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { getPostById } from "@/services/postService";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorNome: string;
  dataCriacao: string;
  usuarioId: number;
}

export function usePostDetails(id: string) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const decodedToken = jwtDecode(token) as { sub: string };
        setCurrentUserId(parseInt(decodedToken.sub));

        const data = await getPostById(id, token);
        setPost(data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push("/auth/login");
        } else {
          setError("Erro ao carregar a postagem. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id, router]);

  return { post, loading, error, currentUserId };
}
