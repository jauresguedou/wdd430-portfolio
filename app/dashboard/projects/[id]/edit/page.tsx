import { redirect } from 'next/navigation';

interface DashboardEditProjectPageProps {
	params: Promise<{ id: string }>;
}

export default async function DashboardEditProjectPage({
	params,
}: DashboardEditProjectPageProps) {
	const { id } = await params;
	redirect(`/projects/${encodeURIComponent(id)}/edit`);
}
