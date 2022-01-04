import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { prisma } from '../../../utils/prismaClient';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.post(async (req, res) => {
  const countCategory = await prisma.category.count();
  const createdCategory = await prisma.category.create({
    data: {
      name: req.body.name,
      order: countCategory + 1,
    },
  });

  res.json(createdCategory);
});

export default handler;
