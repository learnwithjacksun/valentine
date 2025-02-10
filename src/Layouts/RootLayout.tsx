import Pagetransition from "@/Animations/Pagetransition";
import { Header } from "@/Components/UI";
import { ArrowLeft } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const isCard = location.pathname.includes("/card");
  const isHome = location.pathname === "/home";
  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  return (
    <div className="">
      {!isCard && <Header />}

      <div className="bg-gradient-to-b from-[#fff19a] to-pink-100 min-h-[200px]" />
      <Pagetransition>

      <div
        className={`md:w-[768px] relative -translate-y-20 w-full mx-auto p-4 ${
          !isHome && !isCard ? "pt-[70px]" : "pt-10"
        } bg-white rounded-t-3xl`}
      >
        {!isCard && !isHome && (
          <button
            onClick={goBack}
            className="absolute z-10 top-4 left-4 h-10 w-10 center bg-[#f9f9f9] rounded-full text-main"
          >
            <ArrowLeft size={20} />
          </button>

        )}
        {children}
        </div>
      </Pagetransition>
    </div>
  );
};


export default RootLayout;
