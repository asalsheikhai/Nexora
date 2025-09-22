import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';
const buttonVariants = cva('inline-flex items-center justify-center rounded-2xl text-sm font-medium transition focus:outline-none disabled:opacity-50 disabled:pointer-events-none', {
  variants: { variant: { default: 'bg-white text-black hover:opacity-90', brass: 'bg-[#B08D57] text-black hover:opacity-90', ghost: 'bg-transparent border border-neutral-800 text-neutral-200 hover:bg-neutral-900' }, size: { default: 'h-10 px-4 py-2', lg: 'h-12 px-6 py-3', sm: 'h-8 px-3' } },
  defaultVariants: { variant: 'default', size: 'default' }
});
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof buttonVariants> {}
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant, size, ...props }, ref) => (<button ref={ref} className={cn(buttonVariants({ variant, size }), className)} {...props} />));
Button.displayName = 'Button';
