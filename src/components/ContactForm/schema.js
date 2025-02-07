import { z } from "zod";

export const formSchema = (lang) => {

  return z.object({
    email: z.string().email({ message: lang.emailError }),
    message: z.string().min(10, { message: lang.messageError }),
  });

}