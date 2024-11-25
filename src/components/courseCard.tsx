import { ChevronRight, PenTool } from "lucide-react";

interface CourseCardProps {
  title: string;
  onViewCourse: () => void;
  onTakeQuiz: () => void;
}

export default function CourseCard({
  title,
  onViewCourse,
  onTakeQuiz,
}: CourseCardProps) {
  return (
    <div className="relative group perspective-1000">
      <div
        className="relative bg-gray-900 transform hover:-translate-y-1 transition-all duration-300
        border border-gray-800 backdrop-blur-sm shadow-xl"
      >
        <div className="p-6 relative">
          <div className="flex justify-between items-start mb-6">
            <h3
              className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300
              tracking-wide"
            >
              {title}
            </h3>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={onViewCourse}
              className={`flex items-center justify-between px-4 py-3 bg-gradient-to-r 
                from-red-500 to-red-700 text-white rounded-sm hover:from-red-600 hover:to-red-800 
                transition-all duration-300 shadow-lg hover:shadow-red-500/50 group`}
            >
              <span className="font-medium">View Course</span>
              <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onTakeQuiz}
              className="flex items-center justify-between px-4 py-3 bg-gray-800 text-white rounded-sm
                hover:bg-gray-700 transition-all duration-300 border border-gray-700 hover:border-red-500
                shadow-lg hover:shadow-red-500/20 group"
            >
              <span className="font-medium">Take Quiz</span>
              <PenTool className="w-4 h-4 transform group-hover:scale-110 transition-transform" />
            </button>
          </div>

          <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-red-500"></div>
          <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-red-500"></div>
          <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-red-500"></div>
          <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-red-500"></div>
        </div>
      </div>
    </div>
  );
}
