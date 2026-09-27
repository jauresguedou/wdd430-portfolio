'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import {
	deleteProjectRecord,
	insertProject,
	updateProjectRecord,
} from '@/app/projects/lib/projects-db';

async function requireAuthenticatedUser() {
	const session = await auth();
	if (!session?.user) {
		redirect('/login');
	}
}

const currentYear = new Date().getFullYear();

const CreateProjectSchema = z.object({
	title: z.string().trim().min(1, 'Title is required.'),
	description: z.string().trim().min(1, 'Description is required.'),
	technologies: z
		.string()
		.trim()
		.refine(
			(value) => value.split(',').some((technology) => technology.trim().length > 0),
			'Add at least one technology.',
		),
	yearCompleted: z.coerce
		.number()
		.int('Year must be a whole number.')
		.min(2000, 'Year must be 2000 or later.')
		.max(currentYear, `Year cannot be later than ${currentYear}.`),
});

const UpdateProjectSchema = z.object({
	title: z.string().trim().min(1, 'Title is required.'),
	description: z.string().trim().min(1, 'Description is required.'),
	technologies: z
		.string()
		.trim()
		.refine(
			(value) => value.split(',').some((technology) => technology.trim().length > 0),
			'Add at least one technology.',
		),
});

export type State = {
	errors?: {
		title?: string[];
		description?: string[];
		technologies?: string[];
		yearCompleted?: string[];
	};
	message?: string | null;
};

export async function createProject(
	_previousState: State,
	formData: FormData,
): Promise<State> {
	await requireAuthenticatedUser();

	const validatedFields = CreateProjectSchema.safeParse({
		title: formData.get('title'),
		description: formData.get('description'),
		technologies: formData.get('technologies'),
		yearCompleted: formData.get('yearCompleted'),
	});

	if (!validatedFields.success) {
		return {
			errors: validatedFields.error.flatten().fieldErrors,
			message: 'Please correct the highlighted fields.',
		};
	}

	const { title, description, technologies, yearCompleted } = validatedFields.data;

	try {
		await insertProject({
			title,
			description,
			type: 'school',
			technologies: technologies
				.split(',')
				.map((technology) => technology.trim())
				.filter(Boolean),
			yearCompleted,
		});
	} catch {
		return { message: 'Database error: failed to create project.' };
	}

	revalidatePath('/projects');
	redirect('/projects');
}

export async function updateProject(id: string, formData: FormData) {
	await requireAuthenticatedUser();

	const parsedId = z.coerce.number().int().positive().safeParse(id);
	if (!parsedId.success) {
		return;
	}

	const validatedFields = UpdateProjectSchema.safeParse({
		title: formData.get('title'),
		description: formData.get('description'),
		technologies: formData.get('technologies'),
	});
	if (!validatedFields.success) {
		return;
	}

	await updateProjectRecord(parsedId.data, {
		title: validatedFields.data.title,
		description: validatedFields.data.description,
		technologies: validatedFields.data.technologies
			.split(',')
			.map((technology) => technology.trim())
			.filter(Boolean),
	});

	revalidatePath('/projects');
	revalidatePath(`/projects/${parsedId.data}/edit`);
	redirect('/projects');
}

export async function deleteProject(formData: FormData) {
	await requireAuthenticatedUser();

	const projectId = z.coerce.number().int().positive().safeParse(formData.get('projectId'));
	if (!projectId.success) {
		return;
	}

	await deleteProjectRecord(projectId.data);

	revalidatePath('/projects');
	revalidatePath('/projects/opensource');
	revalidatePath('/projects/school');
}
