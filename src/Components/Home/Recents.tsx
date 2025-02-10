import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { ProposalCard } from "@/Components/UI";
import { useCards } from "@/Hooks";


const Recents = () => {
  const {cards} = useCards()
  const recentCards = cards.slice(0, 4);


  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-base font-sans">Recent Proposals</h2>
        <Link
          to="/proposals"
          className="text-sm center font-sans font-medium text-main"
        >
          View All
          <ChevronRight size={20} />
        </Link>
      </div>

      {recentCards.length === 0 && (
        <div className="flex items-center justify-center rounded-2xl flex-col gap-2 h-full bg-[#f9f9f9] p-4">
          <p className="text-sm font-sans font-medium text-main">No recent proposals! 🤷‍♂️</p>
          <Link to="/create" className="text-sm h-10 bg-primary center px-4 rounded-full font-sora font-medium text-black">Create a proposal</Link>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        {recentCards.map((item) => (
          <ProposalCard key={item.cardId} card={item} />
        ))}
      </div>



    </>
  );
};

export default Recents;
