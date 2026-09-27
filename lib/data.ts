import { sql } from '@vercel/postgres';
export { getProjectById } from '@/app/projects/lib/projects-db';

export interface AuthUserRecord {
  id: string | number;
  name: string | null;
  email: string;
  passwordHash: string;
}

interface UserRow {
  id: string | number;
  name: string | null;
  email: string;
  password_hash: string;
}

export async function getUserByEmail(email: string): Promise<AuthUserRecord | null> {
  const { rows } = await sql<UserRow>`
    SELECT id, name, email, password_hash
    FROM users
    WHERE email = ${email}
    LIMIT 1
  `;

  const user = rows[0];
  if (!user) return null;

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    passwordHash: user.password_hash,
  };
}

