// components/StudentModal.tsx
'use client';

import { Student } from "@/types/Student";

interface StudentModalProps {
  student: Student | null;
  isOpen: boolean;
  onClose: () => void;
  onDelete: (id: number) => void;
  onEdit?: (student: Student) => void;
}

export default function StudentModal({ student, isOpen, onClose, onDelete, onEdit }: StudentModalProps) {
  if (!isOpen || !student) return null;

  return (
    <div 
      className="fixed inset-0 bg-gray-400/50 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-2xl font-bold text-black">{student.fullName}</h3>
          <button 
            onClick={onClose}
            className="text-black hover:text-gray-700 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-black">Email</p>
              <p className="font-medium text-black">{student.email}</p>
            </div>
            <div>
              <p className="text-sm text-black">Phone</p>
              <p className="font-medium text-black">{student.phone}</p>
            </div>
            <div>
              <p className="text-sm text-black">Date of Birth</p>
              <p className="font-medium text-black">{student.dob}</p>
            </div>
            <div>
              <p className="text-sm text-black">Enroll Date</p>
              <p className="font-medium text-black">{student.enrollDate}</p>
            </div>
            <div>
              <p className="text-sm text-black">Course</p>
              <p className="font-medium text-black">{student.course}</p>
            </div>
            <div>
              <p className="text-sm text-black">Payment Status</p>
              <span className={`px-2 py-1 text-xs rounded-full ${
                student.paymentStatus === 'paid' 
                  ? 'bg-green-100 text-green-800'
                  : student.paymentStatus === 'partial'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}>
                {student.paymentStatus}
              </span>
            </div>
          </div>

          <div>
            <p className="text-sm text-black">Address</p>
            <p className="font-medium text-black">{student.address}</p>
          </div>

          {student.message && (
            <div>
              <p className="text-sm text-black">Message</p>
              <p className="font-medium text-black">{student.message}</p>
            </div>
          )}

          <div className="border-t pt-3 mt-3">
            <h4 className="font-semibold mb-2 text-black">Payment Details</h4>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-black">Total Fee</p>
                <p className="font-medium text-lg text-black">Rs. {student.totalFee.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-black">Amount Paid</p>
                <p className="font-medium text-lg text-green-600">Rs. {student.amountPaid.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm text-black">Amount Due</p>
                <p className="font-medium text-lg text-red-600">Rs. {student.amountDue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button 
            className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            onClick={onClose}
          >
            Close
          </button>
          {onEdit && (
            <button 
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              onClick={() => onEdit(student)}
            >
              Edit
            </button>
          )}
          <button 
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => {
              if (confirm('Are you sure you want to delete this student?')) {
                onDelete(student.id);
              }
            }}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}