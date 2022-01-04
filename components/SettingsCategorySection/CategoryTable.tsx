import { Category } from '@prisma/client';

import { PencilIcon, TrashIcon } from '@heroicons/react/outline';
import { FC } from 'react';
import { useStore } from '../../lib/store';

interface CategoryTableProps {}

export const CategoryTable: FC<CategoryTableProps> = () => {
  const { categories } = useStore();

  return (
    <div className="mt-4">
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden dark:border dark:border-gray-800">
          <table className="min-w-full leading-normal">
            <thead>
              <tr>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                  Name
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                  Order
                </th>
                <th className="px-5 py-3 border-b-2 border-gray-200 bg-slate-200 text-xs font-semibold text-gray-600 uppercase tracking-wider text-center dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="">
              {categories.map((category) => (
                <tr key={`category-row-${category.id}`}>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm w-4/5 dark:bg-slate-900 dark:border-slate-700">
                    <p className="text-gray-900 whitespace-no-wrap text-semibold dark:text-slate-300">
                      {category.name}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-slate-900 dark:border-slate-700">
                    <p className="text-gray-900 whitespace-no-wrap text-center dark:text-slate-300">
                      {category.order}
                    </p>
                  </td>
                  <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm dark:bg-slate-900 dark:border-slate-700">
                    <p className="flex items-center justify-around text-gray-900 whitespace-no-wrap text-center dark:text-slate-300">
                      <button className="group">
                        <PencilIcon className="h-5 w-5 text-slate-500 transition duration-300 group-hover:scale-110 dark:text-slate-300" />
                      </button>
                      <button className="group">
                        <TrashIcon className="h-5 w-5 text-slate-500 transition duration-300 group-hover:scale-110 dark:text-slate-300" />
                      </button>
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
