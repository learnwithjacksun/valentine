import { Form } from "@/Components/CreateCard";
import { RootLayout } from "@/Layouts";

const CreateCard = () => {
  return (
    <>
      <RootLayout>
        <div className="space-y-6 pb-10">
          <div>
            <h1 className="text-2xl font-sora text-main font-bold">
              Create Card 📝
            </h1>
            <p className="text-sm font-sans text-sub">
              Create a valentine's day proposal card for your loved ones
            </p>
          </div>

          <Form />
        </div>
      </RootLayout>
    </>
  );
};

export default CreateCard;
