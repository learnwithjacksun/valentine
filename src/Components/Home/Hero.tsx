import { Share2 } from "lucide-react";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <>
      <div className="line pb-10">
        <div className="flex flex-col items-center justify-center gap-2">
          <span className="text-sm font-sans bg-yellow-500/10 px-4 py-1 rounded-full border border-yellow-500 text-orange-500 font-medium">
            🎉 Valentine's Day is coming soon!
          </span>
          <h1 className="text-4xl mt-4 font-bold text-main font-sora text-center">
            Create a Valentine's <br /> Proposal Card
          </h1>
          <p className="text-sm font-sans text-sub text-center">
            Share it with your loved ones - Your babe 🥱{" "}
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-6">
          <Link to="/create" className="bg-primary center font-medium text-black font-sora text-sm px-4 h-11 rounded-full">
            Create Card
          </Link>
          <button className="flex items-center gap-2 text-sm font-medium text-main">

            <span>Share platform</span>
            <Share2 size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export default Hero;
