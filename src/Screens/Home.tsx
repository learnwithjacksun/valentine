import { Hero, Recents } from "@/Components/Home";
import { RootLayout } from "@/Layouts";

const Home = () => {
  return (
    <>
      <RootLayout>
        <div className="space-y-10 pb-10">
          <Hero />
          <Recents />
        </div>
      </RootLayout>
    </>

  );
};

export default Home;
