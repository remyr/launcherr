import { useStore } from '@lib/store';
import { AddLinkModal } from './AddLinkModal';
import { LinkTable } from './LinkTable';

export const SettingsLinkSection = () => {
  const { openCreateLinkModal } = useStore();

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-600 dark:text-slate-300">
          Links
        </h1>
        <button
          onClick={openCreateLinkModal}
          className="px-4 py-2 bg-slate-200 rounded-xl text-slate-500 text-semibold shadow-sm border hover:border-slate-300 transition duration-300 dark:border-slate-900 dark:hover:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Add link
        </button>
      </div>
      <LinkTable />
      <AddLinkModal />
    </section>
  );
};
