// frontend/app/posts/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Usamos a interface Post aqui para garantir a consistência
interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorNome: string;
  dataCriacao: string;
}

interface Props {
  params: {
    id: string;
  };
}

export default function PostDetailsPage({ params }: Props) {
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchPost = async () => {
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
        
        // Requisição para buscar um post específico pelo ID
        const response = await axios.get(
          `https://localhost:7299/api/posts/${id}`,
          config
        );
        setPost(response.data);
      } catch (err: any) {
        if (err.response && err.response.status === 401) {
          router.push('/auth/login');
        } else {
          setError('Erro ao carregar a postagem. Tente novamente.');
        }
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id, router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Carregando postagem...</p>
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

  if (!post) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Postagem não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8">
         <div className="flex justify-end mb-4">
        <Link href={`/posts/${post.id}/edit`} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
          Editar Postagem
        </Link>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-4xl font-bold mb-4 text-gray-900">{post.titulo}</h1>
        <p className="text-sm text-gray-600 mb-6">
          Por: {post.autorNome} | Em: {new Date(post.dataCriacao).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.conteudo}</p>
      </div>
      <div className="mt-8 text-center">
        <Link href="/posts" className="font-semibold text-blue-600 hover:underline">
          Voltar para a lista de posts
        </Link>
      </div>
    </div>
  );
}