import ProjectCard from './ProjectCard';
import { fetchFilteredProjects } from '@/app/projects/lib/projects-db';

interface ProjectListProps {
  type?: 'opensource' | 'school';
  query?: string;
  page?: number;
}

export default async function ProjectList({ type, query, page }: ProjectListProps) {
  const projects = await fetchFilteredProjects(query ?? '', page ?? 1, type);

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </section>
  );
}