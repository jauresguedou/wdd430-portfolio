'use client';

import { useEffect, useState } from 'react';
import ProjectList from './ProjectList';

interface Project {
  title: string;
  description: string;
  technologies: string[];
  link?: string;
}

interface ApiProjectListProps {
  type?: 'opensource' | 'school';
}

export default function ApiProjectList({ type }: ApiProjectListProps) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const query = type ? `?type=${type}` : '';

    fetch(`/api/projects${query}`)
      .then((response) => {
        if (!response.ok) throw new Error('Unable to load projects.');
        return response.json() as Promise<Project[]>;
      })
      .then(setProjects)
      .catch((requestError: Error) => setError(requestError.message))
      .finally(() => setIsLoading(false));
  }, [type]);

  if (isLoading) return <p>Loading projects...</p>;
  if (error) return <p role="alert">{error}</p>;

  return <ProjectList projects={projects} />;
}