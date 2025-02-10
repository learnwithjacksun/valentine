import { ProposalCard } from "@/Components/UI"
import { useCards } from "@/Hooks"
import { RootLayout } from "@/Layouts"

const Proposals = () => {
    const {cards} = useCards()
    console.log(cards)
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {cards.map(card => (
            <ProposalCard key={card.$id} card={card} />
          ))}
          </div>
        </div>
      </RootLayout>
    </>


  )
}

export default Proposals