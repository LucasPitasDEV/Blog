'use client';

import Link from "next/link";
import { useEditPost } from "@/hooks/useEditPost";

interface Props {
  params: { id: string };
}

export default function EditPostPage({ params }: Props) {
  const {
    title,
    setTitle,
    content,
    setContent,
    loading,
    error,
    success,
    handleUpdate,
    handleDelete,
  } = useEditPost(params.id);

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
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">Editar Postagem</h2>
        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">Título</label>
            <input
              type="text"
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none text-gray-900"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-gray-700">Conteúdo</label>
            <textarea
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none text-gray-900"
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
            className={`w-full rounded-md p-2 text-white ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
            disabled={loading}
          >
            {loading ? "Atualizando..." : "Atualizar Postagem"}
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={handleDelete}
            className={`w-full rounded-md p-2 text-white ${loading ? "bg-red-400" : "bg-red-600 hover:bg-red-700"}`}
            disabled={loading}
          >
            Deletar Postagem
          </button>
        </div>
        <div className="mt-4 text-center text-sm">
          <Link href={`/posts/${params.id}`} className="font-semibold text-blue-600 hover:underline">
            Cancelar e Voltar
          </Link>
        </div>
      </div>
    </div>
  );
}
