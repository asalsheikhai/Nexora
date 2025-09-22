import * as React from 'react';
import { cn } from '@/lib/utils';
export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (<textarea ref={ref} className={cn('w-full min-h-[90px] rounded-xl bg-black/40 border border-neutral-800 px-4 py-3 text-sm outline-none focus:border-[#B08D57]', className)} {...props} />));
Textarea.displayName = 'Textarea';
