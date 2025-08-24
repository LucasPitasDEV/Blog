'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/auth/login');
  }, [router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <p className="text-gray-600">Redirecionando para a página de login...</p>
    </div>
  );
}