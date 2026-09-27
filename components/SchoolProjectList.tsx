import { getProjects } from '@/app/projects/lib/projects-db';
import ProjectCard from './ProjectCard';

export default async function SchoolProjectList() {
  const projects = await getProjects('school');

  return (
    <section className="grid gap-4 md:grid-cols-2">
      {projects.map((project) => (
        <ProjectCard key={project.title} {...project} />
      ))}
    </section>
  );
}