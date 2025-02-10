import { CardContext } from "@/Context/CardContext";
import { storage, STORAGE } from "@/Lib/appwrite";
import { useContext } from "react";

const useCards = () => {
  const context = useContext(CardContext);
  if (!context) throw new Error("useCards must be used within a CardProvider");
  const { cards, createCard, isLoading , updateCard, deleteCard} = context;

  const imgUrl = (image: string) => {
    return storage.getFilePreview(STORAGE, image);
  };
  return { cards, createCard, isLoading, imgUrl, updateCard, deleteCard };
};


export default useCards;
