import React from 'react';

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className = '' }) => {
  return (
    <div className={`bg-white p-6 rounded-3xl border border-gray-200 shadow-sm ${className}`}>
      {children}
    </div>
  );
};
