import React, { useState } from 'react';

const TextField = React.forwardRef(({
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  onFocus,
  placeholder = '',
  error = '',
  helperText = '',
  required = false,
  disabled = false,
  readOnly = false,
  fullWidth = true,
  size = 'md',
  variant = 'outline',
  className = '',
  inputClassName = '',
  labelClassName = '',
  errorClassName = '',
  helperClassName = '',
  leftIcon = null,
  rightIcon = null,
  maxLength,
  minLength,
  pattern,
  name,
  id,
  autoComplete = 'off',
  autoFocus = false,
  ...rest
}, ref) => {
  
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine if this is a password field
  const isPasswordField = type === 'password';
  
  // Determine input type based on password visibility
  const inputType = isPasswordField 
    ? (showPassword ? 'text' : 'password')
    : type;
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  
  // Size configurations
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  };
  
  // Variant configurations
  const variants = {
    outline: `border ${error ? 'border-red-500' : 'border-gray-300'} 
              focus:border-blue-500 focus:ring-1 focus:ring-blue-500`,
    filled: `bg-gray-100 border-0 ${error ? 'ring-2 ring-red-500' : 'focus:ring-2 focus:ring-blue-500'}`,
    flushed: `border-b-2 border-gray-300 rounded-none ${error ? 'border-red-500' : 'focus:border-blue-500'} 
              focus:ring-0 focus:outline-none px-0`,
  };
  
  // Base input classes
  const baseInputClasses = `
    w-full
    transition-all
    duration-200
    ease-in-out
    outline-none
    disabled:bg-gray-100
    disabled:cursor-not-allowed
    disabled:text-gray-500
    read-only:bg-gray-50
    read-only:cursor-default
    ${sizes[size]}
    ${variants[variant]}
    ${isPasswordField && (rightIcon || !rightIcon) ? 'pr-10' : ''}
    ${leftIcon ? 'pl-10' : ''}
    ${inputClassName}
  `.trim();
  
  // Width class
  const widthClass = fullWidth ? 'w-full' : 'inline-block';
  
  // Handle focus state
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Generate unique ID
  const inputId = id || name || `textfield-${Math.random().toString(36).substr(2, 9)}`;
  
  return (
    <div className={`${widthClass} ${className}`}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={inputId}
          className={`
            block 
            mb-1.5 
            text-sm 
            font-medium 
            text-gray-700
            ${disabled ? 'text-gray-400' : ''}
            ${error ? 'text-red-600' : ''}
            ${labelClassName}
          `.trim()}
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      {/* Input wrapper for icons */}
      <div className="relative">
        {/* Left Icon */}
        {leftIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
            {leftIcon}
          </div>
        )}
        
        {/* Input Element */}
        <input
          ref={ref}
          id={inputId}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          disabled={disabled}
          readOnly={readOnly}
          required={required}
          maxLength={maxLength}
          minLength={minLength}
          pattern={pattern}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={baseInputClasses}
          aria-invalid={!!error}
          aria-describedby={
            error ? `${inputId}-error` : 
            helperText ? `${inputId}-helper` : 
            undefined
          }
          {...rest}
        />
        
        {/* Right Icon (Custom or Password Toggle) */}
        {(isPasswordField || rightIcon) && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            {isPasswordField ? (
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="text-gray-400 hover:text-gray-600 p-1"
                tabIndex={-1}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? (
                  // Eye Slash Icon (Hide)
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" 
                    />
                  </svg>
                ) : (
                  // Eye Icon (Show)
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    strokeWidth={1.5} 
                    stroke="currentColor" 
                    className="w-5 h-5"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" 
                    />
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" 
                    />
                  </svg>
                )}
              </button>
            ) : (
              rightIcon && (
                <div className="text-gray-400">
                  {rightIcon}
                </div>
              )
            )}
          </div>
        )}
      </div>
      
      {/* Error Message */}
      {error && (
        <p 
          id={`${inputId}-error`}
          className={`
            mt-1.5 
            text-sm 
            text-red-600 
            flex 
            items-center 
            gap-1
            ${errorClassName}
          `.trim()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
          </svg>
          {error}
        </p>
      )}
      
      {/* Helper Text */}
      {helperText && !error && (
        <p 
          id={`${inputId}-helper`}
          className={`
            mt-1.5 
            text-sm 
            text-gray-500
            ${helperClassName}
          `.trim()}
        >
          {helperText}
        </p>
      )}
    </div>
  );
});

TextField.displayName = 'TextField';

export default TextField;