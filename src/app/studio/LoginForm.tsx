'use client';

import { useState } from 'react';

export default function LoginForm() {
  const [token, setToken] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError('');
    const res = await fetch('/api/studio', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'login', token }),
    });
    if (res.ok) {
      window.location.reload();
    } else {
      setError('Incorrect token');
      setBusy(false);
    }
  }

  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center px-4">
      <form onSubmit={submit} className="w-full max-w-sm">
        <h1 className="font-syne text-2xl font-bold text-[#FFD700] mb-2">Studio</h1>
        <p className="text-neutral-400 text-sm mb-6">Quote approval queue.</p>
        <label htmlFor="token" className="block text-sm mb-2">
          Access token
        </label>
        <input
          id="token"
          type="password"
          autoComplete="current-password"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded text-sm focus:outline-none focus:border-[#FFD700]"
        />
        {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
        <button
          type="submit"
          disabled={busy || !token}
          className="mt-4 w-full py-2.5 bg-[#FFD700] text-black font-semibold rounded disabled:opacity-40"
        >
          {busy ? 'Checking…' : 'Enter'}
        </button>
      </form>
    </main>
  );
}
