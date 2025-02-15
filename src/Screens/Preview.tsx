import { RootLayout } from "@/Layouts";
import { Check, Copy, Link, Share2, Trash2, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useCards } from "@/Hooks";
import { toast } from "sonner";
import { useState } from "react";
import { Input, Modal } from "@/Components/UI";
import { AnimatePresence } from "framer-motion";

const Preview = () => {
  const location = useLocation();
  const { card } = location.state;
  const { imgUrl } = useCards();
  const [isCopied, setIsCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const { deleteCard } = useCards();
  const [secretWord, setSecretWord] = useState("");
  const [isSecretWordVerified, setIsSecretWordVerified] = useState(false);

  const toggleModal = () => {
    setIsModalOpen((prev) => !prev);
  };

  const toggleLinkModal = () => {
    setIsLinkModalOpen((prev) => !prev);
  };

  const handleSecretWordVerification = () => {
    if(!secretWord) {
      toast.error("Please enter a secret word");
      return;
    }
    if (secretWord !== card?.secret) {
      toast.error("Incorrect secret word");
      return;
    }
    setIsSecretWordVerified(true);
  };



  const handleShare = async () => {
    const message = `Hey, I'm sending you a Valentine's Day card! 💖\n\n${card?.rizz}\n\nCheck it out: ${window.location.origin}/card/${card?.slug}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  const handleCopy = () => {
    navigator.clipboard
      .writeText(window.location.origin + "/card/" + card?.slug)
      .then(() => {
        toast.success("Link copied to clipboard");
        setIsCopied(true);
        setTimeout(() => {
          setIsCopied(false);
        }, 2000);
      })
      .catch(() => {
        toast.error("Failed to copy link");
      });
  };

  const isAccepted = card?.status === "accepted";

  const handleDelete = () => {
    if(!secretWord) {
      toast.error("Please enter your secret word");
      return;
    }
    if(secretWord !== card?.secret) {
      toast.error("Incorrect secret word");
      return;
    }
    toast.promise(deleteCard(card?.$id), {
      loading: "Deleting...",
      success: "Deleted!",
      error: (error) => {
        console.log(error);
        return "Error deleting";
      },
    });
  };

  return (
    <>
      <RootLayout>
        <div className="space-y-4 pb-10">
          <p
            className={`${
              card?.status === "pending"
                ? "bg-yellow-500/10 text-orange-500"
                : "bg-green-500/10 text-green-500"
            } text-xs capitalize font-sans font-medium rounded-full px-4 h-9 center absolute top-2 right-4`}
          >
            {card?.status}
          </p>

          <div className="-translate-y-[50%] space-y-4">
            <div className="h-30 w-30  mx-auto border-4 border-white rounded-full bg-primary overflow-hidden">
              <img
                src={imgUrl(card.image)}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-sora text-main font-medium">
                Will you be my valentine,
                <br /> <span className="text-red-400">{card.to}</span>?
              </h1>

              {/* <span className="text-xs text-orange-500 px-4 py-1 font-sans bg-yellow-500/10 rounded-full font-normal">
                From: <span className="font-medium font-sora">{card.from}</span>
              </span> */}
            </div>
          </div>

          <p className="text-center text-main">
            {isAccepted
              ? "This valentine proposal is already accepted!"
              : "This valentine proposal card is ready to be shared to that special person!"}
          </p>

          <div className="flex justify-center gap-2">
            <button
              onClick={handleShare}
              className=" bg-primary text-sm text-black center gap-2 font-sora px-4 h-10 rounded-full font-medium"
            >
              <span>Share Card</span>
              <Share2 size={18} />
            </button>
            <button
              onClick={toggleModal}
              className="center h-10 px-4 gap-2 text-red-500 font-medium"
            >
              <span>Discard</span>

              <Trash2 size={18} />
            </button>
          </div>
          <div className="center">
            <button
              onClick={toggleLinkModal}
              className="bg-[#f9f9f9] cursor-pointer text-xs text-main center gap-2 font-sora px-4 h-9 rounded-full font-medium"
            >
              <span>Get Card Link</span>
              <Link size={14} />
            </button>
          </div>
        </div>
      </RootLayout>

      <AnimatePresence>
        {isModalOpen && (
          <Modal title="Delete Card" onClose={toggleModal} isOpen={isModalOpen}>
            <div className="space-y-4">
             <div>
              <Input
              label="Secret Word"
              id="secretWord"
              type="text"
              placeholder="Enter your secret word"
              value={secretWord}
              onChange={(e) => setSecretWord(e.target.value)}
              />
              
             </div>
              <div className="flex justify-end gap-2">
                <button
                  onClick={toggleModal}
                  className="bg-primary text-sm text-black center gap-2 font-sora px-4 h-10 rounded-full font-medium"
                >
                  <span>Cancel</span>
                  <X size={18} />
                </button>

                <button
                  onClick={handleDelete}
                  className="bg-red-500 text-sm text-white center gap-2 font-sora px-4 h-10 rounded-full font-medium"
                >
                  <span>Delete</span>
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isLinkModalOpen && (
          <Modal
            title="Get Card Link"
            isOpen={isLinkModalOpen}
            onClose={toggleLinkModal}
          >
            <div className="space-y-4">
              <p>To get the card link, you need to verify your secret word!</p>
              {!isSecretWordVerified && (
                <>
                <Input
                label="Secret Word"
                id="secret-word"
                type="text"
                placeholder="Enter your secret word"
                value={secretWord}
                onChange={(e) => setSecretWord(e.target.value)}
              />

              <button
                onClick={handleSecretWordVerification}
                className="bg-primary text-sm text-black center gap-2 font-sora px-4 h-10 rounded-full font-medium"
              >
                <span>Verify</span>
                <Check size={18} />
              </button>
              </>
              )}


              {isSecretWordVerified && (
                <p className="text-main text-xs bg-[#f9f9f9] p-2 rounded-lg">
                  Shareable Link: <span className="font-medium">{window.location.origin}/card/{card?.slug}</span>
                </p>
              )}

              {isSecretWordVerified && (
                <button
                  onClick={handleCopy}
                  className="bg-primary text-sm text-black center gap-2 font-sora px-4 h-10 rounded-full font-medium"
                >
                  {isCopied ? <span>Copied</span> : <span>Copy Link</span>}
                  {isCopied ? <Check size={16} /> : <Copy size={16} />}
                </button>

              )}
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </>
  );
};

export default Preview;
