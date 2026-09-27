import { redirect } from 'next/navigation';

export default function NewDashboardProjectPage() {
	redirect('/projects/create');
}
