import { Modal } from '@component/Modal';
import { useStore } from '@lib/store';
import axios from 'axios';
import { useState } from 'react';
import { AddCategoryModal } from './AddCategoryModal';
import { CategoryTable } from './CategoryTable';

export const SettingsCategorySection = () => {
  const [removeConfirmModal, setRemoveConfirmModal] = useState(false);
  const [toRemove, setToRemove] = useState(null);
  const { openCreateCategoryModal, removeCategory } = useStore();

  const handleRemove = (categoryId: number) => {
    setToRemove(categoryId);
    setRemoveConfirmModal(true);
  };

  const handleConfirmRemove = async () => {
    removeCategory(toRemove);
    setToRemove(null);
    setRemoveConfirmModal(false);
  };

  return (
    <section>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-slate-600 dark:text-slate-300">
          Categories
        </h1>
        <button
          onClick={openCreateCategoryModal}
          className="px-4 py-2 bg-slate-200 rounded-xl text-slate-500 text-semibold shadow-sm border hover:border-slate-300 transition duration-300 dark:border-slate-900 dark:hover:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
          Add category
        </button>
      </div>
      <CategoryTable remove={handleRemove} />
      <AddCategoryModal />
      <Modal
        title="Are you sure ?"
        confirmLabel="Remove"
        isOpen={removeConfirmModal}
        onClose={() => setRemoveConfirmModal(false)}
        onConfirm={handleConfirmRemove}>
        <div className="text-slate-500 text-sm">
          <p className="">Do you really want to remove this category ?</p>
          <p>Removing this category will also remove associated links.</p>
        </div>
      </Modal>
    </section>
  );
};
