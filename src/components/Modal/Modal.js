import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { GrClose } from "react-icons/gr";

function Modal({ title, description, children, buttons }) {
  let [isOpen, setIsOpen] = useState(true);

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        className="fixed z-10 inset-0 overflow-y-auto"
      >
        <div className="flex items-center justify-center min-h-screen">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative bg-white rounded-lg max-w-md px-5 py-3">
              <div className="border-b py-1 flex justify-between items-center">
                <Dialog.Title className="font-bold text-lg m-0">
                  {title}
                </Dialog.Title>
                <GrClose
                  onClick={() => setIsOpen(false)}
                  className="cursor-pointer"
                />
              </div>

              <div className="my-2">
                {description && (
                  <Dialog.Description className="mb-5 text-gray-500 font-semibold">
                    {description}
                  </Dialog.Description>
                )}
                <div className="my-1">{children}</div>
              </div>

              <Buttons buttons={buttons} />
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

const Buttons = ({ buttons }) => {
  return (
    <div className="flex justify-start">
      {buttons.map((button, index) => {
        return (
          <button
            key={index}
            onClick={button.onClick}
            className="text-white bg-blue-300 px-4 py-2 rounded-lg mr-2"
          >
            {button.name}
          </button>
        );
      })}
    </div>
  );
};

export default Modal;
