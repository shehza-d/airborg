import { z } from "zod";

const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
const otpRegex = /^\d{6}$/;
const regNoRegex = /^\d{1,9}$/;
const cnicRegex = /^\d{13}$/;

export const addLinkFormSchema = z.object({
  content: z.string().min(3).max(500),
});

export const classIdFormSchema = z.object({
  content: z.string().min(2).max(15),
});

export type addLinkFormSchemaType = z.infer<typeof addLinkFormSchema>;
export type classIdFormSchemaType = z.infer<typeof classIdFormSchema>;
