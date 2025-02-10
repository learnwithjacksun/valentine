import { useState } from "react";
import RootLayout from "@/Layouts/RootLayout";
import { useParams } from "react-router-dom";
import { useCards } from "@/Hooks";
import { toast } from "sonner";
import { Loader, Share2 } from "lucide-react";
import { formatDate } from "@/Utils/formatDate";

const Card = () => {
  const { slug } = useParams();
  const { cards, updateCard, isLoading } = useCards();
  const card = cards.find((card) => card.slug === slug);
  const { imgUrl } = useCards();
  console.log(card);
  const isAccepted = card?.status === "accepted";

  const [yesButtonSize, setYesButtonSize] = useState({ scale: 1 }); // Initial font size for Yes button
  const [noButtonStyle, setNoButtonStyle] = useState({
    bottom: "unset",
    left: "unset",
    position: "relative",
  });

  const handleNoClick = () => {
    const maxX = window.innerWidth * 0.6;
    const maxY = window.innerHeight * 0.6;

    const randomX = Math.floor(Math.random() * maxX);
    const randomY = Math.floor(Math.random() * maxY);

    setNoButtonStyle({
      position: "absolute",
      bottom: `${randomY}px`,
      left: `${randomX}px`,
    });

    setYesButtonSize((prevSize) => ({
      scale: prevSize.scale + 0.2,
    }));
  };

  const handleYesClick = () => {
    toast.promise(updateCard(card), {
      loading: "Accepting...",
      success: "Accepted!",
      error: (error) => {
        console.log(error);
        return "Error accepting";
      },
    });
  };
  const handleShare = () => {
    const message = `Hey, I'm sending you a Valentine's Day card! 💖\n\n${card?.message}\n\nCheck it out: ${window.location.origin}/card/${card?.slug}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/?text=${encodedMessage}`;
    window.open(whatsappUrl, "_blank");
  };

  if (!card) {
    return (
      <RootLayout>
        <div className="center gap-2 text-main font-sora text-sm h-[calc(100vh-10rem)]">
          <Loader className="animate-spin" />
          <span>Fetching card...</span>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="relative">
        <div className="-translate-y-[50%]">
          <div className="h-30 w-30 mx-auto border-4 border-white rounded-full bg-primary overflow-hidden">
            <img
              src={imgUrl(card?.image)}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          {!isAccepted && (
            <div className="text-center space-y-2">
              <h1 className="text-2xl font-sora text-main font-medium">
                Will you be my valentine,
                <br /> <span className="text-red-400">{card?.to}</span>?
              </h1>

              <span className="text-xs text-orange-500 px-4 py-1 font-sans bg-yellow-500/10 rounded-full font-normal">
                From: <span className="font-medium">{card?.from}</span>
              </span>
            </div>
          )}
          {isAccepted && (
            <>
              <div className="text-center space-y-2">
                <h1 className="text-2xl font-sora text-main font-medium">
                  Yes, I <span className="text-red-400">{card?.to} </span> will
                  be your valentine!
                </h1>
                <p className="text-center text-sm text-main pb-4 line">
                  Accepted at: {formatDate(card?.$updatedAt)}
                </p>
              </div>
            </>
          )}
        </div>

        {!isAccepted && (
          <>
           {card?.rizz && <p className="text-center text-main pb-4 line whitespace-pre-wrap">{card?.rizz}</p>}


            <p className="text-center text-sub text-sm">Respond now 👇</p>

            <div className="flex justify-center gap-2 relative mt-4">
              <button
                onClick={handleYesClick}
                className="bg-primary text-black center gap-2 font-sora px-4 h-10 rounded-full font-medium transition-all"
                style={{ scale: yesButtonSize.scale }}
              >
                {isLoading ? <Loader className="animate-spin" size={18} /> : "Yes, I will"}
              </button>
              <button
                className="center h-10 px-4 gap-2 bg-red-500 rounded-full font-sora text-sm text-white font-medium absolute duration-300 transition-all"


                style={{
                  ...noButtonStyle,
                  position:
                    noButtonStyle.position === "absolute"
                      ? "absolute"
                      : "relative",
                }}
                onClick={handleNoClick}
              >
                No, I won't
              </button>
            </div>
          </>
        )}

        {isAccepted && (
          <>
            <div className="text-center space-y-2">
              <p className="text-4xl animate-ping">💖</p>
              <span className="text-xs text-orange-500 px-4 py-1 font-sans bg-yellow-500/10 rounded-full font-normal">
                Thank you message from:{" "}
                <span className="font-medium">{card?.from}</span>
              </span>
              <p className="text-center mt-4 text-main pb-4 line">
                {card?.message}
              </p>
            </div>
            <div className="center mt-4">

              <button
                onClick={handleShare}
                className="bg-green-500 text-white center gap-2 font-sora px-4 h-10 rounded-full font-medium transition-all"
              >
                <span>Share to WhatsApp</span>
                <Share2 size={18} />

              </button>
            </div>
          </>
        )}
      </div>
    </RootLayout>
  );
};

export default Card;
