import CreateProjectForm from './create-project-form';

export default function CreateProjectPage() {
	return (
		<main className="mx-auto max-w-2xl px-6 py-10 sm:px-8">
			<h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900">
				Create a project
			</h1>
			<CreateProjectForm />
		</main>
	);
}
