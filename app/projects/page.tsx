import { Suspense } from 'react';
import Pagination from '@/components/Pagination';
import ProjectList from '@/components/ProjectList';
import ProjectSearch from '@/components/ProjectSearch';
import { fetchProjectsPages } from './lib/projects-db';

interface ProjectsPageProps {
	searchParams: Promise<{ query?: string; page?: string }>;
}

export default async function ProjectsPage({ searchParams }: ProjectsPageProps) {
	const { query, page: pageParam } = await searchParams;
	const page = Number.parseInt(pageParam ?? '1', 10) || 1;
	const totalPages = await fetchProjectsPages(query ?? '');

	return (
		<main className="px-6 py-10 sm:px-8">
			<h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Projects Overview
			</h1>
			<Suspense fallback={null}>
				<ProjectSearch />
			</Suspense>
			<ProjectList query={query} page={page} />
			<Suspense fallback={null}>
				<Pagination totalPages={totalPages} />
			</Suspense>
		</main>
	);
}
