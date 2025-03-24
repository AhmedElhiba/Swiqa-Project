import react from "react";
export default function Notfound() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#5D8736] to-[#809D3C] flex flex-col items-center justify-center p-6 text-[#F4FFC3] font-sans">
      {/* Animated 404 text - now in one line */}
      <div className="relative mb-12">
        <h1 className="text-9xl font-bold tracking-tight opacity-90 flex justify-center">
          <span className="inline-block animate-bounce">4</span>
          <span className="inline-block animate-bounce delay-75">0</span>
          <span className="inline-block animate-bounce delay-150">4</span>
        </h1>
      </div>

      {/* Message */}
      <h2 className="text-3xl font-semibold mb-4">Lost in the wilderness?</h2>
      <p className="text-xl mb-8 opacity-90">
        The page you're looking for has wandered off trail. Let's get you back to civilization.
      </p>

      {/* Action buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        <a 
          href="/" 
          className="px-6 py-3 bg-[#A9C46C] hover:bg-[#F4FFC3] text-[#5D8736] font-medium rounded-lg transition-all duration-300 hover:scale-105 shadow-lg"
        >
          Go Home
        </a>
        <a 
          href="/contact" 
          className="px-6 py-3 border-2 border-[#F4FFC3] hover:bg-[#F4FFC3] text-[#F4FFC3] hover:text-[#5D8736] font-medium rounded-lg transition-all duration-300 hover:scale-105"
        >
          Report Issue
        </a>
      </div>

      {/* Decorative elements */}
      <div className="mt-16 flex justify-center space-x-8 opacity-70">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-10 h-10 ${i % 2 === 0 ? 'animate-float' : 'animate-float-reverse'}`}
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd" />
          </svg>
        ))}
      </div>

      {/* Custom animations */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes float-reverse {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(10px); }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        .animate-bounce {
          animation: bounce 1s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-reverse {
          animation: float-reverse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
    );
  }