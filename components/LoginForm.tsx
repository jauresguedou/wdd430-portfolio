'use client';

import { useActionState } from 'react';
import { authenticate, type LoginState } from '@/app/login/actions';

const initialState: LoginState = { message: null };

export function LoginForm() {
	const [state, formAction, isPending] = useActionState(authenticate, initialState);

	return (
		<section className="mx-auto w-full max-w-md px-5 py-12 sm:px-0">
			<div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm sm:p-8">
				<h1 className="text-2xl font-bold text-slate-900">Sign in</h1>
				<p className="mt-2 text-sm text-slate-600">Access your account.</p>

				<form action={formAction} className="mt-7 space-y-5">
					<div>
						<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700">
							Email
						</label>
						<input
							id="email"
							name="email"
							type="email"
							autoComplete="email"
							required
							className="block w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
						/>
					</div>

					<div>
						<label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700">
							Password
						</label>
						<input
							id="password"
							name="password"
							type="password"
							autoComplete="current-password"
							minLength={6}
							required
							className="block w-full rounded-md border border-slate-300 px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20"
						/>
					</div>

					{state.message ? (
						<p role="alert" className="text-sm text-red-700">
							{state.message}
						</p>
					) : null}

					<button
						type="submit"
						disabled={isPending}
						className="w-full rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
					>
						{isPending ? 'Signing in...' : 'Sign in'}
					</button>
				</form>
			</div>
		</section>
	);
}
