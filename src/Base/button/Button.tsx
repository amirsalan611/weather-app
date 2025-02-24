import React from "react";

interface ButtonProps {
  onClick: () => void;
  content: string;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  content,
  className = "",
}) => {
  return (
    <button
      className={`px-4 z-30 py-2 bg-blue-300 rounded-md text-white relative
      after:-z-20 after:absolute after:h-1 after:w-1 after:bg-blue-500 after:left-0
      overflow-hidden after:bottom-0 after:translate-y-full after:rounded-md 
      after:hover:scale-[130] after:hover:transition-all after:hover:duration-700 
      after:transition-all after:duration-700 transition-all duration-700 
      [text-shadow:3px_5px_2px_#2669a5;] hover:[text-shadow:2px_2px_2px_#2669a5] 
      text-2xl ${className}`}
      onClick={onClick}
    >
      {content}
    </button>
  );
};

export default Button;
