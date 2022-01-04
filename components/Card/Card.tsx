import Link from 'next/link';
import { FC } from 'react';

interface CardProps {
  label: string;
  iconUrl: string;
  to: string;
}

export const Card: FC<CardProps> = ({ label, iconUrl, to }) => {
  return (
    <a target="_blank" href={to} rel="noopener noreferrer">
      <div className="bg-white shadow-sm px-8 py-4 rounded-xl flex items-center justify-between border border-white transition dark:bg-slate-800 dark:border-slate-800 dark:hover:border-slate-700 hover:border-gray-200 hover:cursor-pointer">
        <div className="flex items-center">
          <div className="w-[100px] h-[100px] bg-gray-100 rounded-full p-4 dark:bg-slate-600">
            <div className="w-full h-full bg-white rounded-full shadow-sm p-5 flex items-center justify-center relative dark:bg-slate-200">
              <img
                src={iconUrl}
                className="object-cover"
                // objectFit="cover"
              />
            </div>
          </div>
          <h3 className="text-2xl text-slate-500 font-semibold ml-4 dark:text-slate-300">
            {label}
          </h3>
        </div>
        <div className="h-4 w-4 rounded-full bg-red-400 justify-self-end"></div>
      </div>
    </a>
  );
};
