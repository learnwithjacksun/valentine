import { ImagePlus, Loader } from "lucide-react";
import { Input, TextArea } from "../UI";
import { useState } from "react";
import { createCardValidation } from "@/Utils/formvalidation";
import { toast } from "sonner";
import { useCards } from "@/Hooks/";

const Form = () => {
  const { createCard, isLoading } = useCards();
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const [form, setForm] = useState<FormProps>({
    image: null,
    from: "",
    to: "",
    question: "Will you be my valentine?",
    rizz: "",
    message: "",
    email: "",
    secretWord: "",
  });


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file?.type !== "image/png" && file?.type !== "image/jpeg" && file?.type !== "image/jpg") {
      toast.error("Please upload a valid image");
      return;
    }
    if (file) {
      setForm({ ...form, image: file });
      setImgPreview(URL.createObjectURL(file));
    }

  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (createCardValidation(form)) {
      toast.promise(createCard(form), {
        loading: "Creating Valentine Card...",
        success: "Valentine Card created!",
        error: (error) => (error as Error).message,
      });
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="image" className="cursor-pointer">
            <input
              type="file"
              name="image"
              id="image"
              accept=".png, .jpg, .jpeg"
              className="hidden"
              onChange={handleImageChange}
            />
            {imgPreview ? (
              <div className="w-40 h-40 mx-auto relative rounded-full">
                <img
                  src={imgPreview}
                  alt="Image Preview"
                  className="w-full h-full object-cover rounded-full"
                />
                <div className="absolute bottom-0 right-0 bg-primary rounded-full h-10 w-10 flex items-center justify-center">
                  <ImagePlus size={18} />
                </div>
              </div>
            ) : (
              <div className="w-full h-30 overflow-hidden border-dashed border border-line bg-[#f9f9f9] rounded-md flex items-center flex-col gap-2 text-sub justify-center">
                <ImagePlus size={30} className="text-line" />
                <p className="text-sm font-sans text-sub">
                  Click to upload your loved one image
                </p>
              </div>
            )}
          </label>
        </div>
        <Input
          label="From"
          id="from"
          type="text"
          placeholder="Your name"
          onChange={handleChange}
          value={form.from}
        />
        <Input
          label="To"
          id="to"
          type="text"
          placeholder="Your loved one name"
          onChange={handleChange}
          value={form.to}
        />
        <Input
          label="Question (readonly)"
          id="question"
          type="text"
          placeholder="Your question"
          onChange={handleChange}
          value={form.question}
          readOnly
        />

       
        <div className="">
          <Input
            label="Email"
            id="email"
            type="email"
            placeholder="Your email"
            onChange={handleChange}

          />
          <p className="text-xs text-orange-500">
            You will recieve notification about the card status on this email
          </p>
        </div>

        <div className="">
          <Input
            label="Secret Word"
            id="secretWord"
            type="text"
            placeholder="e.g xoxo"
            onChange={handleChange}
          />
          <p className="text-xs text-orange-500">
            This word will be used to verify your identity when you want to
            delete this card
          </p>
        </div>
        <TextArea
          label="Extra Rizz (optional)"
          id="rizz"
          placeholder="e.g From the first day I met you, I knew you were the one for me..."
          onChange={(e) => setForm({ ...form, rizz: e.target.value })}
          value={form.rizz}

        />
        <TextArea
          label="Thank You Message"
          id="message"
          placeholder="e.g Thank you for accepting my valentine!"
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          value={form.message}


        />
        <button
          type="submit"

          className="w-full bg-primary center text-black font-sora font-medium text-sm rounded-md px-2 h-10"
          disabled={isLoading}
        >
          {isLoading ? <Loader className="animate-spin" /> : "Create Card"}
        </button>
      </form>
    </>
  );
};

export default Form;
