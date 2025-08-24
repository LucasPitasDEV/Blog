'use client';

import { useState } from "react";
import Link from "next/link";
import { useCreatePost } from "@/hooks/useCreatePost";

export default function CreatePostPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { handleCreatePost, loading, error, success } = useCreatePost();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCreatePost(title, content);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-900">
          Criar Nova Postagem
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Título
            </label>
            <input
              type="text"
              className="w-full rounded-md border p-2 focus:border-blue-500 focus:outline-none text-gray-900"
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
            {loading ? "Publicando..." : "Publicar Postagem"}
          </button>
        </form>
        <div className="mt-4 text-center text-sm">
          <Link href="/posts" className="font-semibold text-blue-600 hover:underline">
            Voltar para a lista de posts
          </Link>
        </div>
      </div>
    </div>
  );
}
