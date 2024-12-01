'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface Contact {
  id: string
  name: string
  lastInteraction: string
}

const fakeContacts: Contact[] = [
  { id: '1', name: 'João Silva', lastInteraction: '2023-05-15' },
  { id: '2', name: 'Maria Santos', lastInteraction: '2023-05-14' },
  { id: '3', name: 'Pedro Oliveira', lastInteraction: '2023-05-13' },
]

export default function ContactsPage() {
  const { user } = useAuth()
  const [contacts] = useState(fakeContacts)
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Meus Contatos</h1>
      <div className="space-y-4">
        {contacts.map((contact) => (
          <div key={contact.id} className="border p-4 rounded-lg flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold">{contact.name}</h2>
              <p className="text-sm text-gray-500">Última interação: {contact.lastInteraction}</p>
            </div>
            <div className="space-x-2">
              <Link href={`/contatos/${contact.id}/avaliar`}>
                <Button variant="outline">Avaliar</Button>
              </Link>
              <Link href={`/contatos/${contact.id}/denunciar`}>
                <Button variant="outline">Denunciar</Button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

