import { signOut } from '@/auth';

async function signOutAction() {
    'use server';

    await signOut({ redirectTo: '/login' });
}

export function SignOutButton() {
    return (
        <form action={signOutAction}>
            <button
                type="submit"
                className="rounded-md bg-blue-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
            >
                Sign out
            </button>
        </form>
    );
}