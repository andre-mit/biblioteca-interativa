"use client";

import { useCallback, useState } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDropzone } from "react-dropzone";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

import { validationSchema } from "./validationSchema";
import { formatCpfCnpj } from "@/helpers/formatCpfCnpj";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDownIcon, UploadIcon } from "lucide-react";
import Image from "next/image";
import PDFIcon from "@/components/icons/PDFIcon";
import { Card } from "@/components/ui/card";

export default function RegisterPage() {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof validationSchema>>({
    resolver: zodResolver(validationSchema),
    defaultValues: {
      roles: ["tomador"],
    },
  });

  const {
    fields: files,
    append: appendFile,
    remove: removeFile,
    update: updateFile,
  } = useFieldArray({
    control: form.control,
    name: "files",
  });

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      appendFile(
        acceptedFiles.map((file) => ({ name: file.name.split(".")[0], file }))
      );
    },
    [appendFile]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg"],
      "application/pdf": [".pdf"],
    },
    maxFiles: 5,
    multiple: true,
  });

  const handleFileNameChange = (index: number, name: string) => {
    const file = files[index];
    file.name = name;
    updateFile(index, file);
  };

  const handleRemoveFile = (index: number) => {
    removeFile(index);
  };

  const onSubmit = async (data: z.infer<typeof validationSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("cpfCnpj", data.cpfCnpj);
    data.roles.forEach((role) => formData.append("roles", role));
    files.forEach((fileData) => {
      formData.append(`file`, fileData.file);
      formData.append(`fileName`, fileData.name);
    });

    try {
      const response = await fetch("/api/users", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        toast({
          title: "Cadastro efetuado com sucesso",
          variant: "success",
        });
        
        router.push("/login");
      } else {
        const {message} = await response.json();
        console.log(message);
        toast({
          title: "Erro ao registrar usuário",
          content: "Verifique as informações e tente novamente.\n" + message,
          variant: "alert",
        });
      }
    } catch (error) {
      toast({
        title: "Erro ao registrar usuário",
        content: "Tente novamente mais tarde.",
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl">
        <Breadcrumb className="mb-2">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  Autenticação
                  <ChevronDownIcon />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuItem>
                    <Link href="/login">Login</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link
                      href="#"
                      className="text-muted-foreground cursor-not-allowed opacity-50 pointer-events-none"
                    >
                      Cadastro
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbItem>
              <BreadcrumbPage>Cadastro</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <hr />
        <h1 className="mt-2 text-2xl font-bold mb-6 text-center">Cadastro</h1>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 flex flex-col gap-6"
          >
            <main className="flex flex-col md:grid md:grid-cols-2 gap-4 space-y-4">
              <section>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="name">Nome</FormLabel>
                      <FormControl>
                        <Input id="name" type="name" {...field} />
                      </FormControl>
                      <FormDescription>Insira seu email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="email">E-mail</FormLabel>
                      <FormControl>
                        <Input id="email" type="email" {...field} />
                      </FormControl>
                      <FormDescription>Insira seu email</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="password">Senha</FormLabel>
                      <FormControl>
                        <Input id="password" type="password" {...field} />
                      </FormControl>
                      <FormDescription>Insira sua senha</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="confirmPassword">
                        Confirmar Senha
                      </FormLabel>
                      <FormControl>
                        <Input
                          id="confirmPassword"
                          type="password"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>Confirme sua senha</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="cpfCnpj"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="cpfCnpj">CPF/CNPJ</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          maxLength={18}
                          onChange={(e) => {
                            const { value } = e.target;
                            e.target.value = formatCpfCnpj(value);
                            field.onChange(e);
                          }}
                          placeholder="CPF/CNPJ"
                          id="cpfCnpj"
                          type="text"
                        />
                      </FormControl>
                      <FormDescription>Insira seu CPF/CNPJ</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
              <section className="md:h-full flex flex-col gap-4">
                <FormField
                  name="files"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="files" className="mb-2">
                        Documentos
                      </FormLabel>
                      <div
                        {...getRootProps({ className: "dropzone" })}
                        className="flex flex-col items-center justify-center space-y-4 py-12 px-6 border-2 border-gray-300 border-dashed rounded-md transition-colors hover:border-gray-400 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent"
                      >
                        <UploadIcon className="h-12 w-12 text-gray-400" />
                        <div className="font-medium text-gray-900 dark:text-gray-50">
                          <input
                            id={field.name}
                            name={field.name}
                            // value={field.value}
                            ref={field.ref}
                            {...getInputProps()}
                          />
                          <span className="hidden md:block">
                            Arraste e solte os arquivos aqui, ou clique para
                            selecionar
                          </span>
                          <span className="md:hidden">
                            Clique para selecionar arquivos
                          </span>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          PDF ou imagens
                        </span>
                      </div>
                    </FormItem>
                  )}
                />
                {files.length > 0 && (
                  <div className="flex-col">
                    <h3 className="">Arquivos anexados</h3>
                    {files.map((fileData, index) => (
                      <FormField
                        key={index}
                        control={form.control}
                        name={`files.${index}.name`}
                        render={({ field, fieldState }) => (
                          <Card className="p-4">
                            <FormItem className="mt-4">
                              {fileData.file.type.startsWith("image/") ? (
                                <Image
                                  src={URL.createObjectURL(fileData.file)}
                                  alt="Preview"
                                  width={64}
                                  height={64}
                                  className="w-16 h-16 object-cover"
                                />
                              ) : (
                                <div className="flex flex-col items-center">
                                  <PDFIcon className="w-24 h-24" />
                                  <div className="flex items-center justify-between mt-2 w-full">
                                    <span>{fileData.file.name}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveFile(index)}
                                      className="mt-2 text-red-500"
                                    >
                                      Remover
                                    </button>
                                  </div>
                                </div>
                              )}
                              <FormLabel>Nome do documento</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="text"
                                  placeholder="Insira o nome do documento"
                                  value={fileData.name}
                                  onChange={(e) =>
                                    handleFileNameChange(index, e.target.value)
                                  }
                                  className="mt-2"
                                />
                              </FormControl>
                              <FormMessage>
                                {fieldState.error?.message}
                              </FormMessage>
                            </FormItem>
                          </Card>
                        )}
                      />
                    ))}
                  </div>
                )}

                <FormField
                  control={form.control}
                  name="lgpdConsent"
                  render={({ field }) => (
                    <FormItem className="flex items-start space-x-2">
                      <FormControl className="flex mt-1.5">
                        <Checkbox
                          className="peer"
                          id="lgpdConsent"
                          name="lgpdConsent"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="grid gap-1.5 leading-none">
                        <FormLabel
                          className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          htmlFor="lgpdConsent"
                        >
                          Concordo com os termos da{" "}
                          <Link href="#" className="underline">
                            LGPD
                          </Link>
                        </FormLabel>
                        <FormDescription className="text-sm text-muted-foreground">
                          Esta validação é necessária para autenticar sua
                          identidade, conforme os artigos 7º e 11º da LGPD.
                        </FormDescription>
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="roles"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Objetivo</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-2">
                          <label className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes("tomador")}
                              onCheckedChange={(checked) => {
                                field.onChange(
                                  checked
                                    ? [...field.value, "tomador"]
                                    : field.value?.filter(
                                        (role) => role !== "tomador"
                                      )
                                );
                              }}
                            />
                            <span>Tomador</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <Checkbox
                              checked={field.value?.includes("fornecedor")}
                              onCheckedChange={(checked) => {
                                field.onChange(
                                  checked
                                    ? [...field?.value, "fornecedor"]
                                    : field.value?.filter(
                                        (role) => role !== "fornecedor"
                                      )
                                );
                              }}
                            />
                            <span>Fornecedor</span>
                          </label>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </section>
            </main>
            <Button type="submit" className="w-full">
              Cadastrar
            </Button>
          </form>
        </Form>
        <div className="mt-4 text-center">
          Já tem uma conta?
          <Link href="/login" className="ml-1">
            Faça login
          </Link>
        </div>
      </div>
    </div>
  );
}
