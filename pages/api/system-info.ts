import type { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import osu from 'node-os-utils';

const handler = nc<NextApiRequest, NextApiResponse>();
const cpu = osu.cpu;
const mem = osu.mem;

handler.get(async (req, res) => {
  const cpuPercentage = await cpu.usage();
  const memoryInfo = await mem.info();
  res.json({ cpu: cpuPercentage, memory: memoryInfo });
});

export default handler;
