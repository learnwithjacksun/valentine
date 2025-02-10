import {
  Card,
  CreateCard,
  Home,
  PreviewCard,
  Proposals,
  SplashScreen,
} from "@/Screens";
import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
const App = () => {
  const location = useLocation();
  return (
    <>
      <Toaster richColors position="top-center" className="font-sans" />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route index element={<SplashScreen />} />
          <Route path="/home" element={<Home />} />
        <Route path="/create" element={<CreateCard />} />
        <Route path="/preview/:id" element={<PreviewCard />} />
        <Route path="/card/:slug" element={<Card />} />
          <Route path="/proposals" element={<Proposals />} />
        </Routes>
      </AnimatePresence>
    </>
  );
};

export default App;
