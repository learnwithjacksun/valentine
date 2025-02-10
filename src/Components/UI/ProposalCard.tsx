import { useNavigate } from "react-router-dom";
import { Models } from "appwrite";
import { useCards } from "@/Hooks";
import { formatDate } from "@/Utils/formatDate";

const ProposalCard = ({ card }: { card: Models.Document }) => {
  const { imgUrl } = useCards();
  const navigate = useNavigate();
  const handlePreview = (card: Models.Document) => {
    navigate(`/preview/${card.$id}`, { state: { card } });
  };

  return (
    <>
      <div
        onClick={() => handlePreview(card)}
        className="bg-white border border-line flex flex-col gap-2 rounded-2xl p-4 hover:border-primary hover:shadow-2xl shadow-primary/80 duration-200 transition-all"
      >
        <div className="flex items-center gap-2">
          <div className="h-[50px] w-[50px] rounded-full overflow-hidden">
            <img
              src={imgUrl(card.image)}
              alt={card.question}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <p className="text-xs font-sans font-medium text-sub">
              From: {card.from}
            </p>
            <p className=" font-sora font-medium text-main">To: {card.to}</p>
          </div>
        </div>

        {card.rizz && (
          <div className="p-2 bg-[#f9f9f9] rounded-lg">
            <p className="text-sm font-sans font-medium text-sub line-clamp-1">
              {card.rizz}
            </p>
          </div>
        )}

        <div className="flex items-center justify-between gap-2 ms-0 mt-auto">
          <p className="text-xs font-sans font-medium text-sub">
            {formatDate(card.$createdAt)}
          </p>
          <p
            className={`${
              card?.status === "pending"
                ? "bg-yellow-500/10 text-orange-500"
                : "bg-green-500/10 text-green-500"
            } text-xs capitalize font-sans font-medium rounded-full px-2 py-1`}
          >
            {card.status}
          </p>
        </div>
      </div>
    </>
  );
};

export default ProposalCard;
