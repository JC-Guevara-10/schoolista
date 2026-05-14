interface ProgressIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressIndicator({ currentStep, totalSteps }: ProgressIndicatorProps) {
  const steps = ["Rate", "Comment", "Review"].slice(0, totalSteps);
  
  return (
    <div className="mb-8">
      <div className="flex items-center justify-center gap-2">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          
          return (
            <div key={step} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                    isCompleted
                      ? "bg-blue-500 border-blue-500 text-white"
                      : isCurrent
                      ? "bg-yellow-400 border-yellow-400 text-gray-800"
                      : "bg-white border-gray-300 text-gray-400"
                  }`}
                >
                  {isCompleted ? (
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  ) : (
                    <span className="font-semibold">{stepNumber}</span>
                  )}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    isCurrent ? "text-gray-800 font-semibold" : "text-gray-500"
                  }`}
                >
                  {step}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div
                  className={`w-12 h-1 mx-2 rounded-full transition-all ${
                    isCompleted ? "bg-blue-500" : "bg-gray-200"
                  }`}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


