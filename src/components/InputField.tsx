import React, { useState } from "react";
import clsx from "clsx";

export interface InputFieldProps {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  errorMessage?: string;
  disabled?: boolean;
  invalid?: boolean;
  variant?: "filled" | "outlined" | "ghost";
  size?: "sm" | "md" | "lg";
  type?: string;
  clearable?: boolean;
  passwordToggle?: boolean;
}

const InputField: React.FC<InputFieldProps> = ({
  value = "",
  onChange,
  label,
  placeholder,
  helperText,
  errorMessage,
  disabled = false,
  invalid = false,
  variant = "outlined",
  size = "md",
  type = "text",
  clearable = false,
  passwordToggle = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [internalValue, setInternalValue] = useState(value);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInternalValue(e.target.value);
    onChange?.(e);
  };

  const handleClear = () => {
    setInternalValue("");
    onChange?.({
      target: { value: "" },
    } as React.ChangeEvent<HTMLInputElement>);
  };

  // Size styles
  const inputSize = {
    sm: "px-2 py-1 text-sm",
    md: "px-3 py-2 text-base",
    lg: "px-4 py-3 text-lg",
  }[size];


  const variantStyle = {
    filled:
      "bg-gray-100 focus:bg-white border-transparent focus:ring-2 focus:ring-blue-500",
    outlined: "border border-gray-300 focus:ring-2 focus:ring-blue-500",
    ghost: "bg-transparent border-b border-gray-300 focus:border-blue-500",
  }[variant];


  const inputType = passwordToggle
    ? showPassword
      ? "text"
      : "password"
    : type;

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label className="mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      <div className="relative flex items-center w-full">
        <input
          type={inputType}
          value={internalValue}
          onChange={handleChange}
          placeholder={placeholder}
          disabled={disabled}
          className={clsx(
            "rounded-lg w-full focus:outline-none transition",
            inputSize,
            variantStyle,
            disabled && "bg-gray-200 cursor-not-allowed text-gray-500",
            invalid && "border-red-500 focus:ring-red-500"
          )}
        />


        {clearable && internalValue && !disabled && (
          <button
            type="button"
            className="absolute right-2 text-gray-500 hover:text-gray-700"
            onClick={handleClear}
          >
            ✕
          </button>
        )}

        {passwordToggle && (
          <button
            type="button"
            className="absolute right-2 text-gray-500 hover:text-gray-700"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "🙈" : "👁️"}
          </button>
        )}
      </div>


      {invalid && errorMessage ? (
        <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
      ) : (
        helperText && <p className="mt-1 text-sm text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default InputField;


