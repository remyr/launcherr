import { GetServerSideProps } from 'next';
import { FC } from 'react';
import { PrismaClient } from '@prisma/client';

import { SettingsCategorySection } from '@component/SettingsCategorySection';
import { SettingsLinkSection } from '@component/SettingsLinkSection';

const Settings: FC = () => {
  return (
    <div className="flex flex-col w-6/12 mx-auto mt-8 space-y-8">
      <SettingsCategorySection />
      <SettingsLinkSection />
    </div>
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
      initialState: { categories, links },
    },
  };
};

export default Settings;
