import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function Dropdown({ value, onChange, options, placeholder }) {
  const [isOpen, setIsOpen] = useState(false);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-kyro-sidebar border border-kyro-border rounded-lg px-4 py-2 text-sm text-kyro-text hover:bg-opacity-80 transition-colors min-w-[120px] justify-between"
      >
        <span>{selectedOption ? selectedOption.display : placeholder}</span>
        <ChevronDown className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 bg-kyro-sidebar border border-kyro-border rounded-lg shadow-lg z-10 min-w-[120px] max-h-48 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-sm text-kyro-text hover:bg-kyro-border transition-colors"
            >
              {option.display}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
