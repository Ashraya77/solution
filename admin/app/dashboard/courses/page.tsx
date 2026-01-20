import { Plus, Edit, Trash2, Eye } from 'lucide-react';

const courses = [
  { id: 1, name: "Mastering Next.js 14", price: "$49", sales: 120, status: "Published" },
  { id: 2, name: "Python for Data Science", price: "$39", sales: 85, status: "Draft" },
  { id: 3, name: "Advanced Tailwind CSS", price: "$29", sales: 210, status: "Published" },
];

export default function CoursesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Manage Courses</h1>
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
          <Plus size={18} /> New Course
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="p-4 text-sm font-semibold text-gray-600">Course Name</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Price</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Sales</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Status</th>
              <th className="p-4 text-sm font-semibold text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-50 transition">
                <td className="p-4 font-medium text-gray-800">{course.name}</td>
                <td className="p-4 text-gray-600">{course.price}</td>
                <td className="p-4 text-gray-600">{course.sales}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.status === 'Published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="p-4 flex gap-3 text-gray-400">
                  <button className="hover:text-blue-600"><Eye size={18} /></button>
                  <button className="hover:text-amber-600"><Edit size={18} /></button>
                  <button className="hover:text-red-600"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}