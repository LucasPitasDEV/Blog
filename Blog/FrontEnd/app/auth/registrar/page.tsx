// frontend/app/auth/register/page.tsx

'use client';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('https://localhost:7299/api/auth/register', {
        nome: name,
        email: email,
        senha: password,
      });

      setSuccess('Usuário registrado com sucesso! Redirecionando para o login...');
      // Opcional: redirecione o usuário após alguns segundos
      setTimeout(() => {
        // Exemplo de redirecionamento programático
        window.location.href = '/auth/login';
      }, 2000);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'Erro ao registrar usuário.');
      } else {
        setError('Ocorreu um erro. Por favor, tente novamente.');
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Crie sua Conta
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Nome
            </label>
            <input
              type="text"
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
          {success && <p className="mb-4 text-center text-green-500">{success}</p>}
          <button
            type="submit"
            className="w-full rounded-md bg-blue-600 p-2 text-white hover:bg-blue-700"
          >
            Registrar
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          Já tem uma conta?{' '}
          <Link href="/auth/login" className="font-semibold text-blue-600 hover:underline">
            Faça login aqui.
          </Link>
        </p>
      </div>
    </div>
  );
}