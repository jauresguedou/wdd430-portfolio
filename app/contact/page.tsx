export default function Contact() {
	return (
		<main className="container mx-auto px-4 py-12">
			<section className="mx-auto max-w-2xl rounded-lg bg-gray-50 px-6 py-12 text-center shadow-sm sm:px-10">
				<p className="mb-3 text-sm font-semibold uppercase tracking-wide text-blue-600">
					Get in touch
				</p>
				<h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900">
					Let&apos;s work together
				</h1>
				<p className="mb-8 text-lg leading-8 text-gray-700">
					Have a project idea, a question, or an opportunity to discuss? I&apos;d
					love to hear from you.
				</p>
				<a
					href="mailto:xavier.rodriguez@example.com"
					className="inline-block rounded-md bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
				>
					Email Xavier
				</a>
			</section>
		</main>
	);
}