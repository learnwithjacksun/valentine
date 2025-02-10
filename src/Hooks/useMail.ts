import { createClient } from "smtpexpress";
const useMail = () => {
    const smtpexpressClient = createClient({
        projectId: import.meta.env.VITE_SMTP_EXPRESS_PROJECT_ID,
        projectSecret: import.meta.env.VITE_SMTP_EXPRESS_PROJECT_SECRET,
      });

    const sendEmail = async (email: string, subject: string, message: string) => {
        smtpexpressClient.sendApi.sendMail({
          subject,
          message: message,
          sender: {
            name: "Jackson from BeMyVal",
            email: "valentine-db0fd9@smtpexpress.email",
          },
          recipients: email,
        });
      };   
  return {sendEmail}
}

export default useMail