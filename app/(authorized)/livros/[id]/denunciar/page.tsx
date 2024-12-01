"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function ReportPage() {
  const { id } = useParams();
  const router = useRouter();
  const [reason, setReason] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the report to your backend
    console.log("Submitting report:", { bookId: id, reason, description });
    alert("Denúncia enviada com sucesso!");
    router.push(`/livros/${id}`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Denunciar Usuário</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="reason" className="block mb-2">
            Motivo da denúncia:
          </label>
          <Select value={reason} onValueChange={setReason}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Selecione um motivo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="inappropriate">
                Conteúdo inapropriado
              </SelectItem>
              <SelectItem value="spam">Spam</SelectItem>
              <SelectItem value="offensive">Comportamento ofensivo</SelectItem>
              <SelectItem value="other">Outro</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="description" className="block mb-2">
            Descrição:
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full"
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit">Enviar Denúncia</Button>
        </div>
      </form>
    </div>
  );
}
