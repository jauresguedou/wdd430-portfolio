import {sql } from '@vercel/postgres';




// lib/projects-db.ts
export interface Project {
  id: number;
  title: string;
  description: string;
  type: 'opensource' | 'school';
  technologies: string[];
  yearCompleted: number;
  link?: string;
}

const PROJECTS_PER_PAGE = 6;

export async function fetchAllProjects(): Promise<Project[]> {
  const { rows } = await sql<Project>`
    SELECT
      id,
      title,
      description,
      type,
      technologies,
      year_completed AS "yearCompleted"
    FROM projects
    ORDER BY id DESC
  `;
  return rows;
}

export async function fetchFilteredProjects(
  query: string,
  currentPage: number,
  type?: string | null,
): Promise<Project[]> {
  const search = `%${query.trim()}%`;
  const offset = (Math.max(currentPage, 1) - 1) * PROJECTS_PER_PAGE;

  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects
      WHERE type = ${type}
        AND (title ILIKE ${search}
          OR description ILIKE ${search}
          OR technologies::text ILIKE ${search})
      ORDER BY id
      LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
    `;
    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT * FROM projects
    WHERE title ILIKE ${search}
      OR description ILIKE ${search}
      OR technologies::text ILIKE ${search}
    ORDER BY id
    LIMIT ${PROJECTS_PER_PAGE} OFFSET ${offset}
  `;
  return rows;
}

export async function fetchProjectsPages(
  query: string,
  type?: string | null,
): Promise<number> {
  const search = `%${query.trim()}%`;
  const result = type
    ? await sql<{ count: string }>`
        SELECT COUNT(*) AS count FROM projects
        WHERE type = ${type}
          AND (title ILIKE ${search}
            OR description ILIKE ${search}
            OR technologies::text ILIKE ${search})
      `
    : await sql<{ count: string }>`
        SELECT COUNT(*) AS count FROM projects
        WHERE title ILIKE ${search}
          OR description ILIKE ${search}
          OR technologies::text ILIKE ${search}
      `;

  return Math.ceil(Number(result.rows[0]?.count ?? 0) / PROJECTS_PER_PAGE);
}

export async function getProjects(
  type?: string | null,
  query?: string | null,
  page = 1,
): Promise<Project[]> {
  // Temporarily in your data fetch — remove after testing
  await new Promise((res) => setTimeout(res, 2000));

  const offset = (Math.max(page, 1) - 1) * PROJECTS_PER_PAGE;

  if (type && query) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects
      WHERE type = ${type}
        AND (title ILIKE ${`%${query}%`}
          OR description ILIKE ${`%${query}%`}
          OR technologies::text ILIKE ${`%${query}%`})
      ORDER BY id
      LIMIT 6 OFFSET ${offset}
    `;
    return rows;
  }

  if (type) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects WHERE type = ${type} ORDER BY id LIMIT 6 OFFSET ${offset}
    `;
    return rows;
  }

  if (query) {
    const { rows } = await sql<Project>`
      SELECT * FROM projects
      WHERE title ILIKE ${`%${query}%`}
        OR description ILIKE ${`%${query}%`}
        OR technologies::text ILIKE ${`%${query}%`}
      ORDER BY id
      LIMIT 6 OFFSET ${offset}
    `;
    return rows;
  }

  const { rows } = await sql<Project>`
    SELECT * FROM projects ORDER BY id LIMIT 6 OFFSET ${offset}
  `;
  return rows;
}

export async function getProjectById(id: number): Promise<Project | null> {
  const { rows } = await sql<Project>`
    SELECT * FROM projects WHERE id = ${id}
  `;
  return rows[0] ?? null;
}

export async function insertProject(
  project: Pick<Project, 'title' | 'description' | 'type' | 'technologies' | 'yearCompleted'>,
): Promise<void> {
  const technologies = `{${project.technologies
    .map((technology) => `"${technology.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`)
    .join(',')}}`;

  await sql`
    INSERT INTO projects (title, description, type, technologies, year_completed)
    VALUES (
      ${project.title},
      ${project.description},
      ${project.type},
      ${technologies}::text[],
      ${project.yearCompleted}
    )
  `;
}

export async function updateProjectRecord(
  id: number,
  project: Pick<Project, 'title' | 'description' | 'technologies'>,
): Promise<void> {
  const technologies = `{${project.technologies
    .map((technology) => `"${technology.replaceAll('\\', '\\\\').replaceAll('"', '\\"')}"`)
    .join(',')}}`;

  await sql`
    UPDATE projects
    SET title = ${project.title},
        description = ${project.description},
        technologies = ${technologies}::text[]
    WHERE id = ${id}
  `;
}

export async function deleteProjectRecord(id: number): Promise<void> {
  await sql`
    DELETE FROM projects WHERE id = ${id}
  `;
}
