import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useTheme } from 'next-themes';
import { LightBulbIcon, CogIcon } from '@heroicons/react/outline';
import { Button } from './Button';
import Link from 'next/link';

interface SystemInfo {
  cpu: number;
  memory: {
    freeMemPercentage: number;
  };
}

export const Header = () => {
  const { theme, setTheme } = useTheme();
  const [systemInfo, setSystemInfo] = useState<SystemInfo>({
    cpu: 0,
    memory: { freeMemPercentage: 0 },
  });

  useEffect(() => {
    async function fetchData() {
      const { data } = await axios.get('/api/system-info');

      setSystemInfo(data);
    }

    fetchData();

    const interval = setInterval(() => {
      fetchData();
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="w-full flex bg-white dark:bg-slate-800 py-4 px-24 shadow justify-between items-center">
      <Link href="/">
        <a className="text-3xl font-bold text-slate-800 dark:text-slate-100 hover:cursor-pointer">
          Launcherr
        </a>
      </Link>
      <div className="flex space-x-4">
        <div className="flex items-center text-xs bg-slate-200 rounded-xl px-2 dark:bg-slate-900 dark:text-slate-200 min-w-[140px] justify-center">
          <p>
            CPU Usage: <span className="font-semibold">{systemInfo.cpu}%</span>
          </p>
        </div>
        <div className="flex items-center text-xs bg-slate-200 rounded-xl px-2 dark:bg-slate-900 dark:text-slate-200 min-w-[140px] justify-center">
          <p>
            Free memory:{' '}
            <span className="font-semibold">
              {systemInfo.memory.freeMemPercentage}%
            </span>
          </p>
        </div>
        <Button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
          <LightBulbIcon className="h-6 w-6 text-slate-500 dark:text-slate-200" />
        </Button>
        <Button to="/settings">
          <CogIcon className="h-6 w-6 text-slate-500 dark:text-slate-100" />
        </Button>
      </div>
    </div>
  );
};
