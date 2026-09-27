import { notFound } from 'next/navigation';
import { updateProject } from '@/lib/actions';
import { getProjectById } from '@/app/projects/lib/projects-db';

interface EditProjectPageProps {
	params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
	const { id } = await params;
	const projectId = Number.parseInt(id, 10);
	const project = Number.isInteger(projectId) ? await getProjectById(projectId) : null;

	if (!project) {
		notFound();
	}

	const updateProjectWithId = updateProject.bind(null, id);

	return (
		<main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
			<h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
				Edit project
			</h1>
			<form action={updateProjectWithId} className="space-y-6">
				<div>
					<label htmlFor="title" className="mb-2 block font-medium text-gray-900">
						Title
					</label>
					<input
						id="title"
						name="title"
						type="text"
						defaultValue={project.title}
						required
						className="w-full rounded border border-gray-300 px-3 py-2"
					/>
				</div>
				<div>
					<label htmlFor="description" className="mb-2 block font-medium text-gray-900">
						Description
					</label>
					<textarea
						id="description"
						name="description"
						defaultValue={project.description}
						required
						rows={5}
						className="w-full rounded border border-gray-300 px-3 py-2"
					/>
				</div>
				<div>
					<label htmlFor="technologies" className="mb-2 block font-medium text-gray-900">
						Technologies
					</label>
					<input
						id="technologies"
						name="technologies"
						type="text"
						defaultValue={project.technologies.join(', ')}
						required
						className="w-full rounded border border-gray-300 px-3 py-2"
					/>
				</div>
				<button
					type="submit"
					className="rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
				>
					Save changes
				</button>
			</form>
		</main>
	);
}
