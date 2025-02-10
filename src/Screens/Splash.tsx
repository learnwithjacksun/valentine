import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Splash = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/home");
    }, 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  
  return (
    <>
      <div className="h-[100dvh] center bg-gradient-to-br from-[#fff19a] to-pink-100">
        <div className="text-2xl font-bold text-main center gap-2">
          <Heart fill="pink" size={30} />
          <span className="font-sora">Valentine</span>
        </div>
      </div>
    </>
  );
};

export default Splash;
