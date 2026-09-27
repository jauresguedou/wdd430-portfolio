import Link from 'next/link';
import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { deleteProject } from '@/lib/actions';
import { fetchAllProjects } from '@/app/projects/lib/projects-db';

export default async function DashboardProjectsPage() {
	const session = await auth();
	if (!session?.user) {
		redirect('/login');
	}

	const projects = await fetchAllProjects();

	return (
		<main className="mx-auto max-w-7xl px-6 py-10 sm:px-8">
			<div className="mb-8 flex flex-wrap items-end justify-between gap-4">
				<div>
					<p className="text-sm font-medium text-blue-700">Owner dashboard</p>
					<h1 className="mt-1 text-3xl font-bold tracking-tight text-slate-900">
						Projects
					</h1>
					<p className="mt-2 text-sm text-slate-600">
						{projects.length} {projects.length === 1 ? 'project' : 'projects'}
					</p>
				</div>
				<Link
					href="/projects/create"
					className="inline-flex items-center rounded-md bg-blue-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
				>
					Add project
				</Link>
			</div>

			{projects.length === 0 ? (
				<div className="border-y border-slate-200 py-12 text-center">
					<h2 className="text-lg font-semibold text-slate-900">No projects yet</h2>
					<p className="mt-2 text-sm text-slate-600">
						Create a project to see it listed here.
					</p>
				</div>
			) : (
				<div className="overflow-x-auto border-y border-slate-200">
					<table className="w-full min-w-[760px] border-collapse text-left text-sm">
						<thead className="bg-slate-50 text-xs uppercase text-slate-600">
							<tr>
								<th scope="col" className="px-4 py-3 font-semibold">Project</th>
								<th scope="col" className="px-4 py-3 font-semibold">Type</th>
								<th scope="col" className="px-4 py-3 font-semibold">Year</th>
								<th scope="col" className="px-4 py-3 font-semibold">Technologies</th>
								<th scope="col" className="px-4 py-3 font-semibold">Actions</th>
							</tr>
						</thead>
						<tbody className="divide-y divide-slate-200">
							{projects.map((project) => (
								<tr key={project.id} className="align-top">
									<td className="max-w-sm px-4 py-4">
										<p className="font-semibold text-slate-900">{project.title}</p>
										<p className="mt-1 line-clamp-2 text-slate-600">
											{project.description}
										</p>
									</td>
									<td className="px-4 py-4 capitalize text-slate-700">{project.type}</td>
									<td className="px-4 py-4 tabular-nums text-slate-700">
										{project.yearCompleted}
									</td>
									<td className="max-w-xs px-4 py-4 text-slate-700">
										{project.technologies.join(', ')}
									</td>
									<td className="px-4 py-4">
										<div className="flex items-center gap-3">
											<Link
												href={`/projects/${project.id}/edit`}
												className="font-medium text-blue-700 hover:text-blue-900 hover:underline"
											>
												Edit
											</Link>
											<form action={deleteProject}>
												<input type="hidden" name="projectId" value={project.id} />
												<button
													type="submit"
													className="font-medium text-red-700 hover:text-red-900 hover:underline"
												>
													Delete
												</button>
											</form>
										</div>
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			)}
		</main>
	);
}
