interface ProposalCardProps {
  cardId: string;
  question: string;
  message: string;
  image: string;
  from: string;
  to: string;
  status: string;
  createdAt: string;
}

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  id: string;
  type: string;
}

interface FormProps {
  image: File | null;
  from: string;
  to: string;
  question: string;
  message: string;
  email: string;
  secretWord: string;
  rizz: string;
}

interface TextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  id: string;
}

interface CardContextType {
  cards: Models.Document[];
  createCard: (cardDetails: FormProps) => Promise<void>;
  isLoading: boolean;
  updateCard: (card: Models.Document) => Promise<void>;
  deleteCard: (cardId: string) => Promise<void>;
}
