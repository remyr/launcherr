import { GetServerSideProps } from 'next';
import { FC, useState } from 'react';
import { Category, PrismaClient, Link } from '@prisma/client';
import axios from 'axios';

import { AddCategoryModal } from '../components/AddCategoryModal';
import { CategoryTable, LinkTable } from '../components/Table';
import { AddLinkModal } from '../components/AddLinkModal';

interface SettingsProps {
  categories: Category[];
  links: Array<Link & { category: { name: string } }>;
}

const Settings: FC<SettingsProps> = ({
  categories: categoriesData,
  links: linkData,
}) => {
  const [addCategoryModalOpen, setAddCategoryModalOpen] = useState(false);
  const [addLinkModalOpen, setAddLinkModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>(categoriesData);
  const [links, setLink] =
    useState<Array<Link & { category: { name: string } }>>(linkData);

  const handleCategoryCreate = async (name: string) => {
    const { data: categoryCreated } = await axios.post('/api/category', {
      name,
    });

    setCategories((oldValues) => [...oldValues, categoryCreated]);
    setAddCategoryModalOpen(false);
  };

  const handleLinkCreate = async (data: any) => {
    const { data: linkCreated } = await axios.post('/api/link', data);

    setLink((oldValues) => [...oldValues, linkCreated]);
    setAddLinkModalOpen(false);
  };

  return (
    <>
      <div className="flex flex-col w-6/12 mx-auto mt-8 space-y-8">
        <section>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-600 dark:text-slate-300">
              Categories
            </h1>
            <button
              onClick={() => setAddCategoryModalOpen(true)}
              className="px-4 py-2 bg-slate-200 rounded-xl text-slate-500 text-semibold shadow-sm border hover:border-slate-300 transition duration-300 dark:border-slate-900 dark:hover:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Add category
            </button>
          </div>
          <CategoryTable categories={categories} />
        </section>
        <section>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-slate-600 dark:text-slate-300">
              Links
            </h1>
            <button
              onClick={() => setAddLinkModalOpen(true)}
              className="px-4 py-2 bg-slate-200 rounded-xl text-slate-500 text-semibold shadow-sm border hover:border-slate-300 transition duration-300 dark:border-slate-900 dark:hover:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
              Add link
            </button>
          </div>
          <LinkTable links={links} />
        </section>
      </div>

      <AddCategoryModal
        isOpen={addCategoryModalOpen}
        close={() => setAddCategoryModalOpen(false)}
        submit={handleCategoryCreate}
      />
      <AddLinkModal
        categories={categories}
        isOpen={addLinkModalOpen}
        close={() => setAddLinkModalOpen(false)}
        submit={handleLinkCreate}
      />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const prisma = new PrismaClient();
  const categories = await prisma.category.findMany({
    orderBy: [{ order: 'asc' }],
    include: {
      links: true,
    },
  });
  const links = await prisma.link.findMany({
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  return {
    props: {
      categories,
      links,
    },
  };
};

export default Settings;
