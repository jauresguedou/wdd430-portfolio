const skeletonCards = Array.from({ length: 4 });

export default function Loading() {
	return (
		<main className="px-6 py-10 sm:px-8" aria-busy="true" aria-live="polite">
			<h1 className="mb-8 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
				Open Source Projects.
			</h1>
			<section className="grid gap-4 md:grid-cols-2" aria-label="Loading projects">
				{skeletonCards.map((_, index) => (
					<article
						key={index}
						className="animate-pulse rounded border border-blue-600 bg-gray-50 p-4"
						aria-hidden="true"
					>
						<div className="mb-4 h-7 w-3/5 rounded bg-gray-200" />
						<div className="mb-2 h-4 w-full rounded bg-gray-200" />
						<div className="mb-4 h-4 w-4/5 rounded bg-gray-200" />
						<div className="h-4 w-2/5 rounded bg-gray-200" />
					</article>
				))}
			</section>
		</main>
	);
}
