'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { login, register } from "@/services/authService";

export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  async function handleLogin(email: string, senha: string) {
    setLoading(true);
    setError("");

    try {
      const { token, id } = await login(email, senha);
      localStorage.setItem("token", token);
      localStorage.setItem("id", id);
      router.push("/posts");
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Credenciais inválidas.");
      } else {
        setError("Erro ao tentar logar. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRegister(nome: string, email: string, senha: string) {
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      await register(nome, email, senha);
      setSuccess("Usuário registrado com sucesso! Redirecionando...");
      setTimeout(() => router.push("/auth/login"), 2000);
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "Erro ao registrar usuário.");
      } else {
        setError("Ocorreu um erro. Por favor, tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    success,
    handleLogin,
    handleRegister,
  };
}
