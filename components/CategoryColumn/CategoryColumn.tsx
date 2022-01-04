import { FC } from 'react';
import { Card } from '../Card/Card';
import { PhotographIcon } from '@heroicons/react/outline';
import { Link } from '@prisma/client';

interface CategoryColumnProps {
  title: string;
  links: Link[];
}

export const CategoryColumn: FC<CategoryColumnProps> = ({ title, links }) => {
  return (
    <div className="w-full">
      <h2 className="text-3xl text-slate-600 flex items-center dark:text-slate-300">
        <PhotographIcon className="h-8 w-8 mr-4" />
        {title}
      </h2>
      <div className="flex flex-col space-y-8 mt-6">
        {links.map((link) => (
          <Card
            key={`link-${link.id}`}
            label={link.label}
            iconUrl={link.iconUrl}
            to={link.href}
          />
        ))}
      </div>
    </div>
  );
};
