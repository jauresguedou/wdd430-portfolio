'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
	{ href: '/', label: 'Home' },
	{ href: '/about', label: 'About' },
	{ href: '/projects', label: 'Projects' },
	{ href: '/contact', label: 'Contact' },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<ul className="flex gap-6">
			{links.map(({ href, label }) => {
				const isActive =
					pathname === href || (href !== '/' && pathname.startsWith(`${href}/`));

				return (
					<li key={href}>
						<Link
							href={href}
							aria-current={isActive ? 'page' : undefined}
							className={`rounded px-2 py-1 transition-colors ${
								isActive
									? 'bg-white font-semibold text-blue-600'
									: 'text-white hover:bg-blue-700'
							}`}
						>
							{label}
						</Link>
					</li>
				);
			})}
		</ul>
	);
}
