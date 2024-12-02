import validCpfCnpj from "@/helpers/validateCpfCnpj";
import { z } from "zod";

export const validationSchema = z
  .strictObject({
    name: z.string({ required_error: "Nome é obrigatório." }),
    email: z
      .string({ required_error: "Email é obrigatório." })
      .email({ message: "Email inválido." }),
    password: z
      .string({ required_error: "Senha é obrigatória." })
      .min(6, { message: "A senha deve ter pelo menos 6 caracteres." }),

    confirmPassword: z.string({
      required_error: "Confirmação de senha é obrigatória.",
    }),

    cpfCnpj: z
      .string({
        required_error: "CPF/CNPJ é obrigatório.",
      })
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length >= 11;
      }, "CPF/CNPJ deve conter no mínimo 11 caracteres.")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return replacedDoc.length <= 14;
      }, "CPF/CNPJ deve conter no máximo 14 caracteres.")
      .refine((doc) => {
        const replacedDoc = doc.replace(/\D/g, "");
        return !!Number(replacedDoc);
      }, "CPF/CNPJ deve conter apenas números.")
      .refine((doc) => {
        return validCpfCnpj(doc);
      }, "CPF/CNPJ inválido."),

    files: z
      .array(
        z.object({
          file: z.instanceof(File),
          name: z.string().min(3, {
            message: "Nome do arquivo deve ter pelo menos 3 caracteres.",
          }),
        })
      )
      .min(1, { message: "Envie pelo menos um arquivo." })
      .max(5, { message: "Envie no máximo 5 arquivos." }),

    lgpdConsent: z
      .boolean({ required_error: "Consentimento é obrigatório." })
      .refine((lgpdConsent) => lgpdConsent === true, {
        message: "Consentimento é obrigatório.",
      }),

    roles: z
      .array(z.enum(["tomador", "fornecedor"]), {required_error: "Selecione pelo menos um objetivo"})
      .min(1, "Selecione pelo menos um objetivo"),
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== data.password) {
      ctx.addIssue({
        code: "custom",
        path: ["confirmPassword"],
        message: "As senhas devem coincidir.",
      });
    }
  });
