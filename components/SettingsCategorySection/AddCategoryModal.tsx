import { Input } from '@component/Inputs';
import { Modal } from '@component/Modal';
import { FC, SyntheticEvent, useState } from 'react';
import { useForm } from 'react-hook-form';

import { useStore } from '../../lib/store';

type FormData = {
  name: string;
};

export const AddCategoryModal: FC = () => {
  const { modals, closeCreateCategoryModal, createCategory } = useStore();
  const { register, handleSubmit, reset } = useForm<FormData>();

  const onSubmit = handleSubmit((data) => {
    createCategory(data);
    reset();
  });

  return (
    <Modal
      isOpen={modals.createCategoryOpen}
      title="Create a category"
      onClose={closeCreateCategoryModal}
      onConfirm={onSubmit}>
      <form onSubmit={onSubmit} className="mt-4">
        <Input<FormData>
          name="name"
          label="Name"
          id="name"
          placeholder="Name"
          register={register}
        />
      </form>
    </Modal>
  );
};
