import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';

import { prisma } from '../../../utils/prismaClient';

const handler = nc<NextApiRequest, NextApiResponse>();

handler.delete(async (req, res) => {
  await prisma.category.delete({
    where: {
      id: +req.query.id,
    },
  });

  return res.status(200).json({ success: true });
});

export default handler;
