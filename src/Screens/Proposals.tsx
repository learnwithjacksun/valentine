import { ProposalCard } from "@/Components/UI";
import { useCards } from "@/Hooks";
import { RootLayout } from "@/Layouts";
import { Link } from "react-router-dom";

const Proposals = () => {
  const { cards } = useCards();
  console.log(cards);
  return (
    <>
      <RootLayout>
        <div className="space-y-4 pb-10">
          <div>
            <h1 className="text-2xl font-bold">Proposals</h1>
            <p className="text-sm text-sub">
              Here are the proposals that have been created so far...
            </p>
          </div>

          {cards.length === 0 && (
            <div className="flex items-center justify-center rounded-2xl flex-col gap-2 h-full bg-[#f9f9f9] p-4">
              <p className="text-sm font-sans font-medium text-main">
                No recent proposal! 🤷‍♂️
              </p>

              <Link
                to="/create"
                className="text-sm h-10 bg-primary center px-4 rounded-full font-sora font-medium text-black"
              >
                Create a proposal
              </Link>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cards.map((card) => (
              <ProposalCard key={card.$id} card={card} />
            ))}
          </div>
        </div>
      </RootLayout>
    </>
  );
};

export default Proposals;
