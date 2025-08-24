// frontend/app/posts/[id]/page.tsx

'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { jwtDecode } from 'jwt-decode';

// A interface precisa incluir o ID do autor da postagem.
// Certifique-se de que sua API retorna essa propriedade.
interface Post {
  id: number;
  titulo: string;
  conteudo: string;
  autorNome: string;
  dataCriacao: string;
  usuarioId: number; // <-- Adicione esta propriedade
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
  // NOVO: Estado para armazenar o ID do usuário logado
  const [currentUserId, setCurrentUserId] = useState<number | null>(null); 
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchPostAndUserId = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          router.push('/auth/login');
          return;
        }

        // NOVO: 1. Decodifica o token para obter o ID do usuário logado
        const decodedToken = jwtDecode(token) as { sub: string };
        const userId = parseInt(decodedToken.sub);
        setCurrentUserId(userId);

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        
        // 2. Requisição para buscar o post, que deve retornar o 'usuarioId'
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
      fetchPostAndUserId();
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
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-100 py-10 px-4">
    <div className="w-full max-w-2xl mx-auto">
      {/* Renderização condicional: mostra o botão se os IDs forem iguais */}
      {currentUserId === post.userId && (
        <div className="flex justify-end mb-6">
          <Link
            href={`/posts/${post.id}/edit`}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536M9 13l6.586-6.586a2 2 0 112.828 2.828L11.828 15.828a4 4 0 01-1.414.94l-4.243 1.415 1.415-4.243a4 4 0 01.94-1.414z" />
            </svg>
            Editar Postagem
          </Link>
        </div>
      )}
      <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4 text-blue-700 drop-shadow-sm">{post.titulo}</h1>
        <p className="text-sm text-gray-500 mb-6">
          Por: <span className="font-semibold text-purple-600">{post.autorNome}</span> | Em: {new Date(post.dataCriacao).toLocaleDateString()}
        </p>
        <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{post.conteudo}</p>
      </div>
      <div className="mt-8 text-center">
        <Link
          href="/posts"
          className="inline-block font-semibold text-blue-600 hover:underline hover:text-blue-800 transition"
        >
          Voltar para a lista de posts
        </Link>
      </div>
    </div>
  </div>
);
}