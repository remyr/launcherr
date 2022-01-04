import { Prisma } from '@prisma/client';

export type CategoryWithLink = Prisma.CategoryGetPayload<{
  include: {
    links: true;
  };
}>;
