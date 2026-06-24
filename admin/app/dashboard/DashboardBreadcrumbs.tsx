"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

const labelMap: Record<string, string> = {
  dashboard: 'Dashboard',
  students: 'Students',
  new: 'Add Student',
  edit: 'Edit',
};

function formatLabel(segment: string) {
  return labelMap[segment] ?? segment.replaceAll('-', ' ');
}

export function DashboardBreadcrumbs() {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);
  const dashboardIndex = segments.indexOf('dashboard');
  const breadcrumbSegments =
    dashboardIndex >= 0 ? segments.slice(dashboardIndex) : segments;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0">
      <ol className="flex items-center gap-2 text-sm">
        {breadcrumbSegments.map((segment, index) => {
          const href = `/${breadcrumbSegments.slice(0, index + 1).join('/')}`;
          const isLast = index === breadcrumbSegments.length - 1;
          const label = formatLabel(segment);

          return (
            <li key={href} className="flex min-w-0 items-center gap-2">
              {index > 0 && (
                <ChevronRight className="h-4 w-4 shrink-0 text-gray-400" />
              )}
              {isLast ? (
                <span className="truncate font-semibold capitalize text-gray-800">
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      {label}
                    </span>
                  ) : (
                    label
                  )}
                </span>
              ) : (
                <Link
                  href={href}
                  className="truncate capitalize text-slate-500 transition hover:text-purple-700"
                >
                  {index === 0 ? (
                    <span className="inline-flex items-center gap-2">
                      <Home className="h-4 w-4" />
                      {label}
                    </span>
                  ) : (
                    label
                  )}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
