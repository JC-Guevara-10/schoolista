interface TeacherCardProps {
  teacherName: string;
  subject: string;
  avatarUrl: string;
}

export function TeacherCard({ teacherName, subject, avatarUrl }: TeacherCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-md border border-blue-100">
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-blue-500 shadow-lg shrink-0">
          <img 
            src={avatarUrl} 
            alt={teacherName}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="flex-1">
          <h2 className="text-2xl text-gray-800 mb-1">{teacherName}</h2>
          <p className="text-gray-600">{subject}</p>
        </div>
        <div className="bg-yellow-400 text-gray-800 px-4 py-2 rounded-lg shadow-sm">
          <div className="text-sm">Current Rating</div>
          <div className="flex items-center gap-1 mt-1">
            <svg className="w-5 h-5 fill-gray-800" viewBox="0 0 24 24">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span className="font-semibold">4.5/5</span>
          </div>
        </div>
      </div>
    </div>
  );
}


