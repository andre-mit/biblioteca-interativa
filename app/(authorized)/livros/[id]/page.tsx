"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";

interface BookSupplier {
  id: string;
  name: string;
  rating: number;
  transactionType: "emprestimo" | "venda" | "doacao";
  price?: number;
}

const fakeBook = {
  id: "1",
  title: "O Senhor dos Anéis",
  author: "J.R.R. Tolkien",
  description: "Uma épica jornada através da Terra-média.",
  coverUrl: "/placeholder.svg?height=400&width=300",
  suppliers: [
    { id: "1", name: "João", rating: 4.5, transactionType: "emprestimo" },
    { id: "2", name: "Maria", rating: 5, transactionType: "venda", price: 50 },
    { id: "3", name: "Pedro", rating: 4, transactionType: "doacao" },
  ] as BookSupplier[],
};

export default function BookDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<BookSupplier | null>(
    null
  );

  const handleContact = (supplier: BookSupplier) => {
    setSelectedSupplier(supplier);
    setIsContactDialogOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline">Voltar para a lista</Button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={fakeBook.coverUrl}
            alt={fakeBook.title}
            className="w-full rounded-lg shadow-lg"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{fakeBook.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{fakeBook.author}</p>
          <p className="text-gray-700 mb-6">{fakeBook.description}</p>
          <h2 className="text-2xl font-semibold mb-4">Fornecedores</h2>
          <div className="space-y-4">
            {fakeBook.suppliers.map((supplier) => (
              <div key={supplier.id} className="border p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{supplier.name}</span>
                  <span className="text-yellow-500">
                    {"★".repeat(Math.round(supplier.rating))}
                  </span>
                </div>
                <p className="capitalize mb-2">{supplier.transactionType}</p>
                {supplier.price && (
                  <p className="mb-2">Preço: R$ {supplier.price.toFixed(2)}</p>
                )}
                {user && (
                  <Button onClick={() => handleContact(supplier)}>
                    Contatar
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Contatar Fornecedor</DialogTitle>
            <DialogDescription>
              {selectedSupplier && (
                <>
                  <p>Nome: {selectedSupplier.name}</p>
                  <p>Tipo de transação: {selectedSupplier.transactionType}</p>
                  {selectedSupplier.price && (
                    <p>Preço: R$ {selectedSupplier.price.toFixed(2)}</p>
                  )}
                  <p className="mt-4">
                    Clique no botão abaixo para abrir uma conversa no WhatsApp
                    com o fornecedor:
                  </p>
                  <Button
                    className="mt-2"
                    onClick={() => {
                      const message = encodeURIComponent(
                        `Olá! Estou interessado no livro "${fakeBook.title}". Podemos conversar sobre ${selectedSupplier.transactionType}?`
                      );
                      window.open(
                        `https://wa.me/5511999999999?text=${message}`,
                        "_blank"
                      );
                    }}
                  >
                    Abrir WhatsApp
                  </Button>
                </>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {user && (
        <>
          <div className="mt-8">
            <h2 className="text-2xl font-semibold mb-4">Ações</h2>
            <div className="space-x-4">
              <Link href={`/livros/${id}/avaliar`}>
                <Button variant="outline">Avaliar</Button>
              </Link>
              <Link href={`/livros/${id}/denunciar`}>
                <Button variant="outline">Denunciar</Button>
              </Link>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
