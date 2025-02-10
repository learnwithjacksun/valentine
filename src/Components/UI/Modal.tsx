import { X } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const Modal = ({
  children,
  title,
  isOpen,
  onClose,

}: {
  children: React.ReactNode;
  title: string;
  isOpen: boolean;
  onClose: () => void;

}) => {

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <>


      <div className="fixed inset-0 z-50 center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
          className="absolute inset-0 -z-20 bg-black/50"
        />
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -100 }}
          className="bg-white z-100 rounded-2xl p-4 md:w-[500px] w-[90%] mx-auto"
        >
          <div className="flex items-center justify-between">
            <h2 className="text-base font-sora font-medium">{title}</h2>

            <div
              className="cursor-pointer h-10 w-10 center bg-[#f9f9f9] rounded-full text-main"
              onClick={onClose}
            >
              <X size={20} />
            </div>
          </div>

          <div className="mt-4">{children}</div>
        </motion.div>
      </div>
    </>
  );
};

export default Modal;
