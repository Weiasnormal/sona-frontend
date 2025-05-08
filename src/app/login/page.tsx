'use client';

import { Label } from '@radix-ui/react-label';
import { useState } from 'react';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: typeof errors = {};

    if (!email) newErrors.email = 'Email is required';
    if (!password) newErrors.password = 'Password is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Simulate login logic (replace this with API call)
    alert(`Logging in with ${email}`);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-md space-y-6">
      <div>
        <Label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
          Email
        </Label>
        <input
          id="email"
          type="email"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
      </div>

      <div>
        <Label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
          Password
        </Label>
        <input
          id="password"
          type="password"
          className="w-full border border-gray-300 rounded-md px-4 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white rounded-md py-2 hover:bg-blue-700 transition"
      >
        Log In
      </button>
    </form>
  );
}
