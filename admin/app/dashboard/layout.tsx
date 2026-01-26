// app/admin/layout.tsx
import React from 'react';
import Link from 'next/link';
import { LayoutDashboard, BookOpen, Users, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r hidden md:flex flex-col">
        <div className="p-6">
          <h1 className="text-xl font-bold text-blue-600">Admin Panel</h1>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <Link href="/dashboard" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
            <LayoutDashboard className="mr-3 w-5 h-5" /> Dashboard
          </Link>
          <Link href="/dashboard/courses" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
            <BookOpen className="mr-3 w-5 h-5" /> My Courses
          </Link>
          <Link href="/dashboard/students" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
            <Users className="mr-3 w-5 h-5" /> Students
          </Link>
          <Link href="/dashboard/settings" className="flex items-center p-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg">
            <Settings className="mr-3 w-5 h-5" /> Settings
          </Link>
        </nav>
        <div className="p-4 border-t">
          <button className="flex items-center p-3 text-red-600 hover:bg-red-50 w-full rounded-lg">
            <LogOut className="mr-3 w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-white border-b flex items-center justify-between px-8">
          <h2 className="font-semibold text-gray-800">SOLUTION COMPUTER HOUSE</h2>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm">A</div>
          </div>
        </header>
        <section className="flex-1 overflow-y-auto p-8">
          {children}
        </section>
      </main>
    </div>
  );
}