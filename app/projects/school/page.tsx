import { Suspense } from 'react';
import ProjectCardSkeleton from '@/components/ProjectCardSkeleton';
import ProjectSearch from '@/components/ProjectSearch';
import SchoolProjectList from '@/components/SchoolProjectList';

export default function School() {
    return (
        <main className="px-6 py-10 sm:px-8">
            <h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                School Projects.
            </h1>
            <Suspense fallback={null}>
                <ProjectSearch />
            </Suspense>
            <Suspense fallback={<ProjectCardSkeleton />}>
                <SchoolProjectList />
            </Suspense>
        </main>
    );
}