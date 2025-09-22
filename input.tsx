import * as React from 'react';
import { cn } from '@/lib/utils';
export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, ...props }, ref) => (<input ref={ref} className={cn('w-full rounded-xl bg-black/40 border border-neutral-800 px-4 py-3 text-sm outline-none focus:border-[#B08D57]', className)} {...props} />));
Input.displayName = 'Input';
