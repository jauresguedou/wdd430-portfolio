'use client';

import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';

interface PaginationProps {
  totalPages: number;
}

export default function Pagination({ totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number.parseInt(searchParams.get('page') ?? '1', 10) || 1;

  if (totalPages <= 1) return null;

  const createPageURL = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    return `${pathname}?${params.toString()}`;
  };

  const previousPage = Math.max(currentPage - 1, 1);
  const nextPage = Math.min(currentPage + 1, totalPages);

  return (
    <nav className="mt-8 flex items-center justify-between" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link
          href={createPageURL(previousPage)}
          className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded border border-gray-200 px-4 py-2 text-sm text-gray-400">
          Previous
        </span>
      )}

      <span className="text-sm text-gray-600">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages ? (
        <Link
          href={createPageURL(nextPage)}
          className="rounded border border-gray-300 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
        >
          Next
        </Link>
      ) : (
        <span className="rounded border border-gray-200 px-4 py-2 text-sm text-gray-400">
          Next
        </span>
      )}
    </nav>
  );
}