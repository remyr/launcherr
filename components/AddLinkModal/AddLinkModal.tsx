import { Dialog, Transition } from '@headlessui/react';
import { Category } from '@prisma/client';
import { FC, Fragment, SyntheticEvent, useState } from 'react';
import { CategorySelectInput } from '../Inputs';

interface AddLinkModalProps {
  categories: Category[];
  isOpen: boolean;
  close: () => void;
  submit: (data: any) => void;
}

export const AddLinkModal: FC<AddLinkModalProps> = ({
  isOpen,
  close,
  submit,
  categories,
}) => {
  const [label, setLabel] = useState('');
  const [iconUrl, setIconUrl] = useState('');
  const [href, setHref] = useState('');
  const [categorySelected, setCategorySelected] = useState(categories[0]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    submit({
      label,
      iconUrl,
      href,
      category: categorySelected.id,
    });
    setLabel('');
    setIconUrl('');
    setHref('');
    setCategorySelected(categories[0]);
    // submit(name);
    // setName('');
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={close}>
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true">
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900">
                  Add a link
                </Dialog.Title>
                <form
                  onSubmit={handleSubmit}
                  className="mt-4 flex flex-col space-y-4">
                  <div>
                    <label
                      htmlFor="label"
                      className="block text-sm font-medium text-gray-700">
                      Label
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="label"
                        type="text"
                        name="label"
                        className="focus:ring-slate-500 focus:border-slate-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md text-slate-700"
                        placeholder="Label"
                        value={label}
                        onChange={(e) => setLabel(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="icon"
                      className="block text-sm font-medium text-gray-700">
                      Icon url
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="icon"
                        type="text"
                        name="icon"
                        className="focus:ring-slate-500 focus:border-slate-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md text-slate-700"
                        placeholder="https://icon.url/xxxx"
                        value={iconUrl}
                        onChange={(e) => setIconUrl(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="href"
                      className="block text-sm font-medium text-gray-700">
                      Link to
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <input
                        id="href"
                        type="text"
                        name="href"
                        className="focus:ring-slate-500 focus:border-slate-500 block w-full px-4 sm:text-sm border-gray-300 rounded-md text-slate-700"
                        placeholder="https://my.application"
                        value={href}
                        onChange={(e) => setHref(e.target.value)}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Category
                    </label>
                    <CategorySelectInput
                      options={categories}
                      selected={categorySelected}
                      handleChange={(category) => setCategorySelected(category)}
                    />
                  </div>
                </form>

                <div className="mt-6 flex items-center justify-end space-x-2">
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
                    onClick={close}>
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-900 bg-slate-100 border border-transparent rounded-md hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-500"
                    onClick={handleSubmit}>
                    Create
                  </button>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
