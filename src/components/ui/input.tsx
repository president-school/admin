import { UseFormRegister } from "react-hook-form";
import { Inputs } from "../../utils/types";

interface Props {
  type: string;
  name: keyof Inputs;
  error: string;
  register: UseFormRegister<Inputs>;
}
export const Input = ({ type, name, register }: Props) => {
  return (
    <div>
      <input
        type={type}
        className="w-full p-4 bg-slate-200 outline-none rounded-2xl"
        placeholder={name}
        {...register(name, { required: `${name} is required` })}
      />
      <p className="text-red-600"></p>
    </div>
  );
};
