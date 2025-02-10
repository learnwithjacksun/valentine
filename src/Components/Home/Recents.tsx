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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {recentCards.map((item) => (
          <ProposalCard key={item.cardId} card={item} />
        ))}
      </div>



    </>
  );
};

export default Recents;
