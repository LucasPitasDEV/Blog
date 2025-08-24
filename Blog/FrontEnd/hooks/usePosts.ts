'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPosts } from "@/services/postService";

interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorNome: string;
  dataCriacao: string;
}

export function usePosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function fetchPosts() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/auth/login");
          return;
        }

        const data = await getPosts(token);
        setPosts(data);
      } catch (err: any) {
        if (err.response?.status === 401) {
          router.push("/auth/login");
        } else {
          setError("Erro ao carregar as postagens. Tente novamente.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, [router]);

  return { posts, loading, error, setPosts };
}
