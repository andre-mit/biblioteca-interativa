'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StarIcon } from 'lucide-react'

export default function EvaluationPage() {
  const { id } = useParams()
  const router = useRouter()
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the evaluation to your backend
    console.log('Submitting evaluation:', { bookId: id, rating, comment })
    alert('Avaliação enviada com sucesso!')
    router.push(`/livros/${id}`)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Avaliar Livro</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="mb-2">Sua avaliação:</p>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <StarIcon
                key={star}
                className={`w-8 h-8 cursor-pointer ${
                  star <= rating ? 'text-yellow-500' : 'text-gray-300'
                }`}
                onClick={() => setRating(star)}
              />
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block mb-2">Seu comentário:</label>
          <Textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={4}
            className="w-full"
          />
        </div>
        <div className="flex justify-between">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancelar
          </Button>
          <Button type="submit">Enviar Avaliação</Button>
        </div>
      </form>
    </div>
  )
}

