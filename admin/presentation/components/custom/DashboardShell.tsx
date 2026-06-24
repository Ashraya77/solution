"use client";

import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  LogOut,
  Menu,
  Plus,
  Users,
  X,
} from "lucide-react";
import { DashboardBreadcrumbs } from "@/app/dashboard/DashboardBreadcrumbs";
import {
  getStoredAdminUsername,
  getStoredToken,
  LogoutService,
} from "@/app/lib/services/LoginService";

type DashboardShellProps = {
  children: ReactNode;
};

const navItems = [
  {
    href: "/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/dashboard/students",
    label: "Students",
    icon: Users,
  },
  {
    href: "/dashboard/students/new",
    label: "Add Student",
    icon: Plus,
  },
];

export default function DashboardShell({ children }: DashboardShellProps) {
  const [ready, setReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [username, setUsername] = useState("Admin");
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const token = getStoredToken();

      if (!token) {
        router.replace("/login");
        return;
      }

      setUsername(getStoredAdminUsername());
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [router]);

  const handleLogout = async () => {
    await LogoutService();
    router.replace("/login");
  };

  if (!ready) {
    return (
      <div className="grid min-h-screen place-items-center bg-slate-50 text-sm text-slate-600">
        Loading dashboard...
      </div>
    );
  }

  const sidebar = (
    <aside className="flex h-full w-72 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-200 px-5 py-5">
        <p className="text-xs font-bold uppercase text-yellow-600">
          Solution Computer House
        </p>
        <h1 className="mt-1 text-xl font-bold text-slate-950">Admin</h1>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className={`flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-semibold transition ${
                active
                  ? "bg-purple-700 text-white"
                  : "text-slate-700 hover:bg-yellow-50 hover:text-purple-800"
              }`}
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="border-t border-slate-200 p-3">
        <button
          type="button"
          className="flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950">
      <div className="hidden min-h-screen md:flex">
        {sidebar}
        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-200 bg-white px-6">
            <div className="min-w-0">
              <DashboardBreadcrumbs />
            </div>
            <div className="flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-yellow-400 text-sm font-bold text-purple-950">
                {username.slice(0, 1).toUpperCase()}
              </div>
              <span className="text-sm font-semibold text-slate-700">
                {username}
              </span>
            </div>
          </header>
          <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>

      <div className="min-h-screen md:hidden">
        <header className="flex h-16 items-center justify-between border-b border-slate-200 bg-white px-4">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-700 transition hover:bg-slate-100"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation"
          >
            <Menu className="h-6 w-6" />
          </button>
          <p className="text-sm font-bold text-purple-900">SCH Admin</p>
          <button
            type="button"
            className="rounded-lg p-2 text-red-600 transition hover:bg-red-50"
            onClick={handleLogout}
            aria-label="Logout"
          >
            <LogOut className="h-5 w-5" />
          </button>
        </header>

        {menuOpen && (
          <div className="fixed inset-0 z-50 flex bg-slate-950/40">
            {sidebar}
            <button
              type="button"
              className="m-4 h-10 w-10 rounded-lg bg-white text-slate-700 shadow"
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation"
            >
              <X className="mx-auto h-5 w-5" />
            </button>
          </div>
        )}

        <main className="px-4 py-6">{children}</main>
      </div>
    </div>
  );
}
