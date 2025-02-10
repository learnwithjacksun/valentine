import { toast } from "sonner";

export const createCardValidation = (form: FormProps) => {
  if (!form.image) {
    toast.error("Image is required!");
    return;
  }
  if (!form.from) {
    toast.error("Your name is required!");
    return;
  }
  if (!form.to) {
    toast.error("Your loved one name is required!");
    return;
  }
  if (!form.email) {
    toast.error("Your email is required!");
    return;
  }
  if (!form.secretWord) {
    toast.error("Your secret word is required!");
    return;
  }
  return true;

};
