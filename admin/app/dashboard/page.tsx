// app/admin/page.tsx
"use client"
import React from 'react';
import { Users, BookOpen, CreditCard, TrendingUp } from 'lucide-react';

const stats = [
  { label: 'Total Students', value: '1,284', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100' },
  { label: 'Active Courses', value: '12', icon: BookOpen, color: 'text-green-600', bg: 'bg-green-100' },
  { label: 'Total Revenue', value: '$12,450', icon: CreditCard, color: 'text-purple-600', bg: 'bg-purple-100' },
  { label: 'Enrollments (MTD)', value: '+18%', icon: TrendingUp, color: 'text-orange-600', bg: 'bg-orange-100' },
];

export default function page() {
  return (
    <div className="space-y-8">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500 font-medium">{stat.label}</p>
                <h3 className="text-2xl font-bold mt-1 text-gray-800">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} p-3 rounded-lg`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Table */}
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
            {[1, 2, 3, 4, 5].map((i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="p-4 text-sm font-medium text-gray-700">Student Name {i}</td>
                <td className="p-4 text-sm text-gray-600">Next.js for Beginners</td>
                <td className="p-4 text-sm text-gray-500">Oct 24, 2023</td>
                <td className="p-4">
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">Paid</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}