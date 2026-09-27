'use client';

import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function ProjectSearch() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const updateSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (term.trim()) {
      params.set('query', term.trim());
    } else {
      params.delete('query');
    }

    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  return (
    <label className="mb-8 block max-w-md">
      <span className="mb-2 block text-sm font-medium text-gray-700">
        Search projects
      </span>
      <input
        type="search"
        defaultValue={searchParams.get('query') ?? ''}
        onChange={(event) => updateSearch(event.target.value)}
        placeholder="Search by title or technology"
        className="w-full rounded border border-gray-300 px-3 py-2 text-gray-900 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
      />
    </label>
  );
}