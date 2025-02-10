import { ArrowRight, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };
  return (
    <>
      <header className="fixed inset-x-0 top-0 z-20 backdrop-blur-sm">
        <div className="main">
          <div className="flex items-center justify-between h-[60px]">
            <Link
              to="/"
              className="flex items-center gap-2 font-sora font-medium"
            >
              <Heart fill="pink" />
              <span>Valentine</span>
            </Link>
            <button
              onClick={toggleModal}
              className="flex items-center font-sora font-medium text-sm gap-2 bg-white rounded-full px-4 py-2"
            >
              <Github size={18} />
              <span>Github</span>
            </button>
          </div>
        </div>
      </header>

<AnimatePresence>

      {isModalOpen && (
        <Modal title="Github" isOpen={isModalOpen} onClose={toggleModal}>
          <div>
            <div className="flex items-center gap-2">
              <img
                src="https://api.dicebear.com/9.x/identicon/svg?seed=learnwithjacksun"
                alt="github"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="text-sm font-sora font-medium">Gift Jacksun</p>
                <p className="text-xs font-sans text-sub font-medium">
                  @learnwithjacksun
                </p>
              </div>
            </div>

            <div className="flex flex-col items-center gap-2 mt-6">
              <a
                href="http://github.com/learnwithjacksun/valentine"
                target="_blank"
                rel="noopener noreferrer"
                className="center gap-2 font-sora font-medium text-sm w-full bg-primary text-black rounded-full px-4 py-2"
              >
                <span>See project repository</span>
                <ArrowRight size={18} />
              </a>

              <a
                href="https://github.com/learnwithjacksun"
                target="_blank"
                rel="noopener noreferrer"
                className="center gap-2 font-sora font-medium text-sm text-main w-full bg-white rounded-full px-4 py-2"
              >
                <span>Follow me on Github</span>
                <Github size={18} />
              </a>
            </div>
          </div>
        </Modal>
      )}
</AnimatePresence>
    </>
  );
};

export default Header;
