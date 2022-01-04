import Link from 'next/link';
import { FC, HTMLAttributes } from 'react';

interface ButtonProps extends HTMLAttributes<HTMLButtonElement> {
  to?: string;
}

export const Button: FC<ButtonProps> = ({ children, to, ...rest }) => {
  if (to) {
    return (
      <Link href="/settings">
        <a className="bg-slate-200 p-2 rounded-xl shadow-sm border hover:border-slate-300 transition duration-300 dark:bg-slate-900 dark:border-slate-900 dark:hover:border-slate-700">
          {children}
        </a>
      </Link>
    );
  }

  return (
    <button
      {...rest}
      className="bg-slate-200 p-2 rounded-xl shadow-sm border hover:border-slate-300 transition duration-300 dark:bg-slate-900 dark:border-slate-900 dark:hover:border-slate-700">
      {children}
    </button>
  );
};
