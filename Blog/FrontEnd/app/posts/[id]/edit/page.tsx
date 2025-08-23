'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

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

export default function EditPostPage({ params }: Props) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(true);
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

        const response = await axios.get(`https://localhost:7299/api/posts/${id}`, config);
        const postData: Post = response.data;
        setTitle(postData.titulo);
        setContent(postData.conteudo);

      } catch (err: any) {
        setError('Erro ao carregar a postagem para edição.');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchPost();
    }
  }, [id, router]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      const id = localStorage.getItem('id');
      if (!token) {
        setError('Você precisa estar logado para editar uma postagem.');
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.put(`https://localhost:7299/api/posts/${id}`, { titulo: title, conteudo: content, userId: id }, config);
      setSuccess('Postagem atualizada com sucesso!');
      router.push(`/posts/${id}`);
      
    } catch (err: any) {
      setError('Erro ao atualizar a postagem. Por favor, verifique os campos.');
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Tem certeza que deseja deletar esta postagem?')) {
      return;
    }
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Você precisa estar logado para deletar uma postagem.');
        return;
      }
      
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      await axios.delete(`https://localhost:7299/api/posts/${id}`, config);
      setSuccess('Postagem deletada com sucesso!');
      router.push('/posts');
      
    } catch (err: any) {
      setError('Erro ao deletar a postagem.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Carregando formulário...</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Editar Postagem
        </h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Conteúdo
            </label>
            <textarea
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              rows={6}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          {success && <p className="mb-4 text-center text-green-500">{success}</p>}
          <button
            type="submit"
            className={`w-full rounded-md p-2 text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Atualizando...' : 'Atualizar Postagem'}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className={`w-full rounded-md p-2 text-white ${loading ? 'bg-red-400' : 'bg-red-600 hover:bg-red-700'}`}
            disabled={loading}
          >
            Deletar Postagem
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href={`/posts/${id}`} className="font-semibold text-blue-600 hover:underline">
            Cancelar e Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}