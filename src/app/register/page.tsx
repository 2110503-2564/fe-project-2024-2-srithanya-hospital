'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import userRegister from '@/libs/userRegister';

export default function RegisterPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [telephone, setTelephone] = useState('');
    const [role, setRole] = useState('user');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await userRegister(name, email, password, telephone, role);
            alert('Registration successful! Please log in.');
            router.push('/api/auth/signin'); // Redirect to login page
        } catch (err: any) {
            setError(err.message || 'Failed to register');
        }
    };

    return (
        <main className="flex flex-col items-center justify-center min-h-screen p-5">
            <h1 className="text-3xl font-bold mb-5">Register</h1>
            <form onSubmit={handleRegister} className="w-full max-w-md space-y-4">
                <div>
                    <label className="block text-sm font-medium">Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium">Telephone</label>
                    <input
                        type="text"
                        value={telephone}
                        onChange={(e) => setTelephone(e.target.value)}
                        className="w-full border rounded p-2"
                        required
                    />
                </div>
                {/* <div>
                    <label className="block text-sm font-medium">Role</label>
                    <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="w-full border rounded p-2"
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div> */}
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
                >
                    Register
                </button>
            </form>
            <p className="mt-4 text-sm">
                Already have an account?{' '}
                <a
                    href="/api/auth/signin"
                    className="text-blue-500 hover:underline"
                >
                    Log in here
                </a>
            </p>
        </main>
    );
}
