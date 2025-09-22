import * as React from 'react';
export const Label = ({ children, htmlFor }: { children: React.ReactNode; htmlFor?: string }) => (<label htmlFor={htmlFor} className="text-sm text-neutral-300">{children}</label>);
