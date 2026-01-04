type Props = {
  step: string;
};

const STEPS = [
  { id: "destination", label: "Destination", number: 1 },
  { id: "travelers", label: "Travelers", number: 2 },
  { id: "review", label: "Review", number: 3 },
];

export default function StepProgressIndicator({ step }: Props) {
  const currentStepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <nav className="mb-8">
      <ol className="flex justify-between items-center">
        {STEPS.map((stepItem, index) => {
          const isActive = stepItem.id === step;
          const isCompleted = index < currentStepIndex;

          return (
            <li key={stepItem.id} className="flex-1">
              <div
                className={`text-center ${
                  isActive ? "text-purple-400 font-bold" : "text-purple-200"
                }`}
              >
                <div
                  className={`w-10 h-10 mx-auto rounded-full flex items-center justify-center mb-2 ${
                    isActive
                      ? "bg-purple-500"
                      : isCompleted
                      ? "bg-purple-700"
                      : "bg-slate-600"
                  }`}
                >
                  {isCompleted ? (
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    stepItem.number
                  )}
                </div>
                <p className="text-sm">{stepItem.label}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
