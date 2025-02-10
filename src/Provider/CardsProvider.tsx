import { CardContext } from "@/Context/CardContext";
import useMail from "@/Hooks/useMail";
import { CARDS, client, databases, DB, STORAGE, storage } from "@/Lib/appwrite";
import {
  createCardEmailTemplate,
  updateCardEmailTemplate,
} from "@/Templates/emailTemplate";
import { slugify } from "@/Utils/slug";
import { ID, Models, Query } from "appwrite";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const CardsProvider = ({ children }: { children: React.ReactNode }) => {
  const [cards, setCards] = useState<Models.Document[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { sendEmail } = useMail();

  const createCard = async (cardDetails: FormProps) => {
    setIsLoading(true);
    try {
      if (!cardDetails?.image) throw new Error("Image is required");
      const file = await storage.createFile(
        STORAGE,
        ID.unique(),
        cardDetails?.image
      );
      const card = await databases.createDocument(DB, CARDS, ID.unique(), {
        cardId: ID.unique(),
        question: cardDetails.question,
        message: cardDetails.message,
        image: file.$id,
        from: cardDetails.from,
        to: cardDetails.to,
        status: "pending",
        creatorEmail: cardDetails.email,
        secret: cardDetails.secretWord,
        slug: `${slugify(cardDetails.to)}-${ID.unique()}`,
        rizz: cardDetails.rizz,
      });
      navigate(`/preview/${card.slug}`, { state: { card } });

      await getCards();
      sendEmail(
        cardDetails.email,
        "Valentine Proposal",
        createCardEmailTemplate(card)
      );
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const getCards = useCallback(async () => {
    setIsLoading(true);
    try {
      const cards = await databases.listDocuments(DB, CARDS, [
        Query.orderDesc("$createdAt"),
      ]);
      setCards(cards.documents);
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getCards();
  }, [getCards]);

  const updateCard = async (card: Models.Document) => {
    setIsLoading(true);
    try {
      await databases.updateDocument(DB, CARDS, card.$id, {
        status: "accepted",
      });
      await getCards();
      sendEmail(
        card.creatorEmail,
        "Valentine Proposal",
        updateCardEmailTemplate(card)
      );
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteCard = async (cardId: string) => {
    setIsLoading(true);
    try {
      await databases.deleteDocument(DB, CARDS, cardId);
      await getCards();
      navigate("/proposals");
    } catch (error) {
      console.error(error);
      throw new Error((error as Error).message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = client.subscribe(
      [`databases.${DB}.collections.${CARDS}.documents`],
      (response) => {
        const event = response.events[0];

        if (event.includes("create")) {
          getCards();
        } else if (event.includes("update")) {
          getCards();
        }
      }
    );
    return () => unsubscribe();
  }, [getCards]);

  const value = {
    cards,
    createCard,
    isLoading,
    updateCard,
    deleteCard,
  };

  return <CardContext.Provider value={value}>{children}</CardContext.Provider>;
};

export default CardsProvider;
