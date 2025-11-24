import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '',
  ...props 
}) => {
  const baseStyles = "px-4 py-2 font-mono text-sm transition-all duration-200 border uppercase tracking-wider disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-theme-element border-theme-border text-theme-highlight hover:bg-theme-panel hover:border-theme-muted shadow-sm",
    secondary: "bg-transparent border-theme-border text-theme-muted hover:text-theme-highlight hover:border-theme-muted",
    danger: "bg-cinnabar border-red-900 text-white hover:bg-red-700",
    ghost: "bg-transparent border-transparent text-theme-muted hover:text-theme-highlight"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};