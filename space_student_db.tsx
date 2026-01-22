import React, { useState } from 'react';
import { Search, Plus, Edit2, Trash2, X, Save, Star, Rocket } from 'lucide-react';

export default function SpaceStudentDatabase() {
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Alex Chen",
      studentId: "STU001",
      email: "alex.chen@university.edu",
      phone: "+1 234-567-8901",
      dob: "2003-05-15",
      major: "Computer Science",
      year: "Sophomore",
      gpa: "3.8",
      enrollmentDate: "2022-09-01"
    },
    {
      id: 2,
      name: "Maria Garcia",
      studentId: "STU002",
      email: "maria.garcia@university.edu",
      phone: "+1 234-567-8902",
      dob: "2002-11-20",
      major: "Physics",
      year: "Junior",
      gpa: "3.9",
      enrollmentDate: "2021-09-01"
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    studentId: '',
    email: '',
    phone: '',
    dob: '',
    major: '',
    year: '',
    gpa: '',
    enrollmentDate: ''
  });

  const resetForm = () => {
    setFormData({
      name: '',
      studentId: '',
      email: '',
      phone: '',
      dob: '',
      major: '',
      year: '',
      gpa: '',
      enrollmentDate: ''
    });
    setEditingStudent(null);
  };

  const handleAdd = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleEdit = (student) => {
    setFormData(student);
    setEditingStudent(student.id);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this student?')) {
      setStudents(students.filter(s => s.id !== id));
    }
  };

  const handleSubmit = () => {
    if (editingStudent) {
      setStudents(students.map(s => s.id === editingStudent ? { ...formData, id: editingStudent } : s));
    } else {
      const newId = Math.max(...students.map(s => s.id), 0) + 1;
      setStudents([...students, { ...formData, id: newId }]);
    }
    setIsModalOpen(false);
    resetForm();
  };

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.major.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-purple-900 to-slate-900 p-6">
      {/* Animated stars background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <Star
            key={i}
            className="absolute text-yellow-200 opacity-20"
            size={Math.random() * 3 + 1}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite`
            }}
          />
        ))}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <Rocket className="text-cyan-400" size={40} />
            <h1 className="text-4xl font-bold text-white">Student Database</h1>
            <Rocket className="text-cyan-400 transform scale-x-[-1]" size={40} />
          </div>
          <p className="text-cyan-300 text-lg">Exploring the Universe of Knowledge</p>
        </div>

        {/* Search and Add Section */}
        <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 mb-6 border border-cyan-400/30 shadow-lg shadow-cyan-500/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-cyan-300" size={20} />
              <input
                type="text"
                placeholder="Search students by name, ID, email, or major..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/5 border border-cyan-400/50 rounded-lg text-white placeholder-cyan-300/50 focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
            <button
              onClick={handleAdd}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30"
            >
              <Plus size={20} />
              Add Student
            </button>
          </div>
        </div>

        {/* Students Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map(student => (
            <div
              key={student.id}
              className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-purple-400/30 hover:border-cyan-400/50 transition-all shadow-lg hover:shadow-cyan-500/20 hover:scale-105 duration-300"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{student.name}</h3>
                  <p className="text-cyan-300 text-sm">{student.studentId}</p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(student)}
                    className="p-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 rounded-lg transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(student.id)}
                    className="p-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 rounded-lg transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-purple-300">Email:</span>
                  <span className="text-white">{student.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Phone:</span>
                  <span className="text-white">{student.phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">DOB:</span>
                  <span className="text-white">{student.dob}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Major:</span>
                  <span className="text-cyan-300 font-medium">{student.major}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Year:</span>
                  <span className="text-white">{student.year}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">GPA:</span>
                  <span className="text-green-300 font-bold">{student.gpa}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-purple-300">Enrolled:</span>
                  <span className="text-white">{student.enrollmentDate}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredStudents.length === 0 && (
          <div className="text-center py-12">
            <p className="text-cyan-300 text-lg">No students found in the cosmos...</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-indigo-900 to-purple-900 rounded-lg p-8 max-w-2xl w-full border border-cyan-400/50 shadow-2xl shadow-cyan-500/30 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">
                {editingStudent ? 'Edit Student' : 'Add New Student'}
              </h2>
              <button
                onClick={() => { setIsModalOpen(false); resetForm(); }}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
              >
                <X className="text-white" size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Student ID *</label>
                  <input
                    type="text"
                    required
                    value={formData.studentId}
                    onChange={(e) => setFormData({...formData, studentId: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Date of Birth *</label>
                  <input
                    type="date"
                    required
                    value={formData.dob}
                    onChange={(e) => setFormData({...formData, dob: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Major *</label>
                  <input
                    type="text"
                    required
                    value={formData.major}
                    onChange={(e) => setFormData({...formData, major: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Year *</label>
                  <select
                    required
                    value={formData.year}
                    onChange={(e) => setFormData({...formData, year: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  >
                    <option value="" className="bg-indigo-900">Select Year</option>
                    <option value="Freshman" className="bg-indigo-900">Freshman</option>
                    <option value="Sophomore" className="bg-indigo-900">Sophomore</option>
                    <option value="Junior" className="bg-indigo-900">Junior</option>
                    <option value="Senior" className="bg-indigo-900">Senior</option>
                  </select>
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">GPA *</label>
                  <input
                    type="text"
                    required
                    value={formData.gpa}
                    onChange={(e) => setFormData({...formData, gpa: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
                <div>
                  <label className="block text-cyan-300 mb-2 text-sm">Enrollment Date *</label>
                  <input
                    type="date"
                    required
                    value={formData.enrollmentDate}
                    onChange={(e) => setFormData({...formData, enrollmentDate: e.target.value})}
                    className="w-full px-4 py-2 bg-white/10 border border-cyan-400/50 rounded-lg text-white focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSubmit}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all shadow-lg shadow-cyan-500/30"
                >
                  <Save size={20} />
                  {editingStudent ? 'Update Student' : 'Add Student'}
                </button>
                <button
                  type="button"
                  onClick={() => { setIsModalOpen(false); resetForm(); }}
                  className="px-6 py-3 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-colors border border-white/30"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}