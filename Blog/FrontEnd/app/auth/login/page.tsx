'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

  try {
    // Desestrutura a resposta para pegar 'data' diretamente
    const response = await axios.post('https://localhost:7299/api/Auth/login', {
        email: email,
        senha: password, // Mude 'password' para 'senha'
      });

    // Acessa o token diretamente do objeto desestruturado
    const { token } = response.data;
    const { id } = response.data;
    localStorage.setItem('token', token);
    localStorage.setItem('id', id);
    router.push('/posts');

  } 
 catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Credenciais inválidas. Tente novamente.');
      } else {
        setError('Ocorreu um erro. Por favor, tente novamente.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Acesse sua Conta
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Senha
            </label>
            <input
              type="password"
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="mb-4 text-center text-red-500">{error}</p>}
          <button
            type="submit"
            className={`w-full rounded-md p-2 text-white ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
            disabled={loading}
          >
            {loading ? 'Entrando...' : 'Entrar'}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Não tem uma conta?{' '}
          <Link href="/auth/registrar" className="font-semibold text-blue-600 hover:underline">
            Crie uma aqui.
          </Link>
        </p>
      </div>
    </div>
  );
}