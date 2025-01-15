import { ModalForm } from "./form";

export const FormModal = () => {
  return (
    <div className="fixed w-full h-screen left-0 top-0 bg-black bg-opacity-50 flex items-center justify-center z-10">
      <ModalForm />
    </div>
  );
};
