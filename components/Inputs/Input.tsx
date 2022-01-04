import { FC, HTMLAttributes } from 'react';
import { Path, RegisterOptions, UseFormRegister } from 'react-hook-form';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  placeholder: string;
};

export type FormInputProps<TFormValues> = {
  name: Path<TFormValues>;
  rules?: RegisterOptions;
  register?: UseFormRegister<TFormValues>;
} & Omit<InputProps, 'name'>;

export const Input = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  label,
  ...props
}: FormInputProps<TFormValues>) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="mt-1 relative rounded-md shadow-sm">
        <input
          {...props}
          id={name}
          name={name}
          className="bg-white focus:ring-slate-500 focus:border-slate-500 block w-full px-4 sm:text-sm border py-2 border-gray-300 rounded-md text-slate-700 focus:outline-none"
          {...(register && register(name, rules))}
        />
      </div>
    </div>
  );
};
