import { Header } from '../components/Header';
import { CategoryColumn } from '../components/CategoryColumn';
import { PrismaClient, Prisma } from '@prisma/client';
import { FC } from 'react';
import { GetServerSideProps } from 'next';

type CategoryWithLink = Prisma.CategoryGetPayload<{
  include: {
    links: true;
  };
}>;

interface IndexProps {
  categories: CategoryWithLink[];
}

const IndexPage: FC<IndexProps> = ({ categories }) => {
  return (
    <div className="px-4 grid grid-cols-1 gap-8 mt-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
      {/* <div className="px-24 grid grid-cols-1 gap-8 mt-8"> */}
      {categories.map((category) => (
        <CategoryColumn
          key={`category-${category.id}`}
          title={category.name}
          links={category.links}
        />
      ))}
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

  return {
    props: {
      categories,
    },
  };
};

export default IndexPage;
