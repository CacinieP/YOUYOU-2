import { ReactNode } from 'react';
import { cn } from '../../utils/format';

interface CardProps {
  children: ReactNode;
  className?: string;
  title?: string;
}

export function Card({ children, className, title }: CardProps) {
  return (
    <div className={cn('bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-700', className)}>
      {title && <h3 className="text-xl font-bold mb-4 text-cyber-green">{title}</h3>}
      {children}
    </div>
  );
}
