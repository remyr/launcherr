import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { prisma } from '../../../utils/prismaClient';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const countLink = await prisma.link.count();
  const createdCategory = await prisma.link.create({
    data: {
      label: req.body.label,
      order: countLink + 1,
      iconUrl: req.body.iconUrl,
      href: req.body.href,
      categoryId: req.body.category,
    },
    include: {
      category: {
        select: {
          name: true,
        },
      },
    },
  });

  res.json(createdCategory);
});

export default handler;
