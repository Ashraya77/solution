import { Search, Mail, MoreVertical } from 'lucide-react';

export default function StudentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">Students</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search students..." 
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-indigo-500" />
              <div>
                <h3 className="font-semibold text-gray-800">Alex Johnson</h3>
                <p className="text-xs text-gray-500">Enrolled in 3 courses</p>
              </div>
            </div>
            <button className="p-2 hover:bg-gray-100 rounded-full text-gray-400">
              <MoreVertical size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}