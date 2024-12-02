import fs from "fs";
import path from "path";
import repository from "@/lib/repository";
import { NextRequest, NextResponse } from "next/server";

import { DocumentType, Role, User } from "@/lib/@types";

const userRepository = repository.userRepository;

export const config = {
  api: {
    bodyParser: false, // Desabilita o bodyParser padrão do Next.js
  },
};

export async function POST(req: NextRequest, res: NextResponse) {
  const data = await req.formData();

  const files = data.getAll("file");
  const documents: DocumentType[] = [];
  const baseUrl = "documents";

  const findUser = userRepository.getUserByEmail(data.get("email") as string);
  if (findUser) {
    return NextResponse.json(
      { message: "Usuário já cadastrado" },
      { status: 409 }
    );
  }

  try {
    for (const file of files) {
      if (file instanceof File) {
        const randomName = Math.random().toString(36).substring(7);
        const fileName = `${randomName}-${file.name}`;

        const filePath = path.join(process.cwd(), "public", baseUrl, fileName);

        // Salvar o arquivo no sistema de arquivos
        const buffer = Buffer.from(await file.arrayBuffer());
        fs.writeFileSync(filePath, buffer);

        console.log({ name: file.name, url: `/${baseUrl}/${fileName}` });
        documents.push({
          name: file.name,
          url: `/${baseUrl}/${fileName}`,
        });
      }
    }

    console.log(documents);

    const name = data.get("name") as string;
    const email = data.get("email") as string;
    const password = data.get("password") as string;
    const cpfCnpj = data.get("cpfCnpj") as string;
    const roles = data.getAll("roles") as Role[];

    console.log(documents);

    const userId = userRepository.addUser({
      name,
      email,
      password,
      cpfCnpj,
      docType: cpfCnpj.length <= 14 ? "CPF" : "CNPJ",
      roles,
      documents
    } as User);

    return NextResponse.json({
      message: `Usuário ${userId} criado com sucesso!`,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Erro ao processar o formulário" },
      { status: 500 }
    );
  }
}
