export interface ErrorMessageProps {
  message?: string;
  className?: string;
  id?: string;
}

export default function ErrorMessage({
  message,
  className = "",
  id,
}: ErrorMessageProps) {
  if (!message) return null;

  return (
    <p id={id} className={`text-red-400 text-sm mt-1 ${className}`.trim()}>
      {message}
    </p>
  );
}
