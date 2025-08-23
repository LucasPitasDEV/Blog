// frontend/app/posts/page.tsx

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    name: string;
  };
  dataCriacao: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Se não houver token, redireciona para a página de login
          router.push('/auth/login');
          return;
        }
        // Configura o cabeçalho de autorização com o token JWT
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        // Faz a requisição para a API de posts
        const response = await axios.get('https://localhost:7299/api/posts', config);
        setPosts(response.data);
        console.log(response.data)
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          // Token expirado ou inválido, redireciona para o login
          router.push('/auth/login');
        } else {
          setError('Erro ao carregar as postagens. Tente novamente.');
          console.error('Erro na requisição:', err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Carregando postagens...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
        <div className="flex justify-end mb-4">
        <Link href="/posts/create" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Criar Nova Postagem
        </Link>
      </div>
      <h1 className="mb-8 text-4xl font-bold text-center">Últimas Postagens</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} passHref>
            <div className="block rounded-lg shadow-md bg-white p-6 hover:shadow-xl transition-shadow duration-300">
              <h2 className="text-xl font-semibold mb-2 text-gray-800">{post.titulo}</h2>
              <p className="text-sm text-gray-600 mb-4">Por: {post.autorNome}</p>
              <p className="text-gray-700">{post.conteudo.substring(0, 100)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}