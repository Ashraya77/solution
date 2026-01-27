"use client";

import { useEffect, useState } from 'react';
import { Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';
import { fetchAdminDashboard } from '../lib/api/dashboard';

type Stat = {
  label: string;
  value: string | number;
  icon: any;
  color: string;
  bg: string;
};

export default function AdminPage() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminDashboard()
      .then((data) => {
        setStats([
          {
            label: 'Total Students',
            value: data.totalStudents,
            icon: Users,
            color: 'text-blue-600',
            bg: 'bg-blue-100',
          },
          {
            label: 'Active Courses',
            value: data.activeCourses,
            icon: BookOpen,
            color: 'text-green-600',
            bg: 'bg-green-100',
          },
          {
            label: 'Total Revenue',
            value: `$${data.revenue}`,
            icon: CreditCard,
            color: 'text-purple-600',
            bg: 'bg-purple-100',
          },
          {
            label: 'Enrollments (MTD)',
            value: `${data.enrollments}%`,
            icon: TrendingUp,
            color: 'text-orange-600',
            bg: 'bg-orange-100',
          },
        ]);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading admin dashboard...</p>;

  return (
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">
                  {stat.label}
                </p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">
                  {stat.value}
                </h3>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b">
          <h3 className="font-bold text-gray-800">Recent Enrollments</h3>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-600 text-sm">
            <tr>
              <th className="p-4 font-semibold">Student</th>
              <th className="p-4 font-semibold">Course</th>
              <th className="p-4 font-semibold">Date</th>
              <th className="p-4 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {Array.from({ length: 5 }).map((_, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-700">
                  Student {i + 1}
                </td>
                <td className="p-4 text-sm text-gray-600">
                  Next.js for Beginners
                </td>
                <td className="p-4 text-sm text-gray-500">
                  Oct 24, 2023
                </td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                    Paid
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
