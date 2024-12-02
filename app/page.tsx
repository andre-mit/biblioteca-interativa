"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Layout } from "@/components/Layout";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";

import { useAuth } from "@/contexts/AuthContext";

interface Book {
  id: string;
  title: string;
  author: string;
  coverUrl: string;
}

const fakeBooks: Book[] = [
  {
    id: "1",
    title: "O Senhor dos Anéis",
    author: "J.R.R. Tolkien",
    coverUrl: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "2",
    title: "1984",
    author: "George Orwell",
    coverUrl: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "3",
    title: "Dom Quixote",
    author: "Miguel de Cervantes",
    coverUrl: "/placeholder.svg?height=200&width=150",
  },
  {
    id: "4",
    title: "Cem Anos de Solidão",
    author: "Gabriel García Márquez",
    coverUrl: "/placeholder.svg?height=200&width=150",
  },
];

export default function BooksPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const filteredBooks = fakeBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto p-4">
        <div className="flex space-x-4 mb-6">
          <Input
            type="text"
            placeholder="Buscar livros..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-grow"
          />
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="fiction">Ficção</SelectItem>
              <SelectItem value="non-fiction">Não-ficção</SelectItem>
              <SelectItem value="science">Ciência</SelectItem>
              <SelectItem value="history">História</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <main className="flex flex-col gap-4">
          {user && (user.roles.includes("admin") || user.roles.includes("fornecedor")) && (
            <Link
              className="bg-slate-800 rounded text-white p-3 w-fit self-end"
              href="/livros/novo"
            >
              Fornecer Livro
            </Link>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <Link href={`/livros/${book.id}`} key={book.id}>
                <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-48 object-cover mb-4"
                  />
                  <h2 className="text-lg font-semibold">{book.title}</h2>
                  <p className="text-gray-600">{book.author}</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </Layout>
  );
}
