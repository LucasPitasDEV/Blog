'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  id: number;
  titulo: string; // Corrigido para corresponder ao backend
  conteudo: string; // Corrigido para corresponder ao backend
  autorNome: string; // Corrigido para corresponder ao backend
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
          router.push('/auth/login');
          return;
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        const response = await axios.get('https://localhost:7299/api/posts', config);
        setPosts(response.data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
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

  // --- Nova função para lidar com o logoff ---
  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/auth/login');
  };
  // -------------------------------------------

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
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10">
    <div className="container mx-auto max-w-5xl px-4">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-10 gap-6 md:gap-0">
        <h1 className="flex items-center gap-2 text-3xl md:text-4xl font-extrabold text-blue-700 drop-shadow-sm">
          <svg className="w-7 h-7 md:w-8 md:h-8 text-purple-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20l9-5-9-5-9 5 9 5zm0 0V4" />
          </svg>
          Blog<span className="text-purple-500">.Dev</span>
        </h1>
        <div className="flex gap-3">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-md shadow transition text-base font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1" />
            </svg>
            Sair
          </button>
          <Link
            href="/posts/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-md shadow transition text-base font-medium"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Nova Postagem
          </Link>
        </div>
      </div>

      <h2 className="mb-8 text-2xl font-semibold text-gray-700 text-center">
        Últimas Postagens
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <Link key={post.id} href={`/posts/${post.id}`} passHref>
            <div className="cursor-pointer rounded-xl shadow-lg bg-white p-6 border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-200">
              <h3 className="text-xl font-bold mb-2 text-blue-800">{post.titulo}</h3>
              <p className="text-xs text-gray-400 mb-1">
                {new Date(post.dataCriacao).toLocaleDateString()} • Por <span className="font-semibold text-purple-600">{post.autorNome}</span>
              </p>
              <p className="text-gray-700 mt-2">{post.conteudo.substring(0, 120)}...</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  </div>
);
}