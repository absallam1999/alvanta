import { cn } from '@/utils/cn';

export default function Container({ children, className, size = 'default' }) {
  const sizes = {
    default: 'max-w-7xl',
    small: 'max-w-4xl',
    large: 'max-w-8xl',
  };

  return (
    <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', sizes[size], className)}>
      {children}
    </div>
  );
}
