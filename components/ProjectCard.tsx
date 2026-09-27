import { deleteProject } from '@/lib/actions';

interface ProjectCardProps {
    id: number;
    title: string;
    description: string;
    technologies: string[];
    link?: string;
}


export default function ProjectCard({ id, title, description, technologies, link }: ProjectCardProps) {
    return (
        <article className="p-4 border-1-4 border-blue-600 bg-gray-50 rounded">
            <h3 className="text-xl font-bold mb-2">{title}</h3>
            <p className="text-gray-700 mb-3">{description}</p>
            <p className="text-sm text-gray-600">
                <strong>Technologies:</strong> {technologies.join(", ")}
            </p>
            {link && (
             <p className="mt-2">
                <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline mt-2 inline-block">
                    View Project
                </a>
             </p>
            )}
            <form action={deleteProject} className="mt-4">
                <input type="hidden" name="projectId" value={id} />
                <button
                    type="submit"
                    className="rounded bg-red-600 px-3 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                    Delete project
                </button>
            </form>
        </article>
    )
}