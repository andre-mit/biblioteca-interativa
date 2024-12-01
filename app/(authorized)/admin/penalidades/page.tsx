'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface Report {
  id: string
  reportedUser: string
  reason: string
  description: string
}

const fakeReports: Report[] = [
  { id: '1', reportedUser: 'João Silva', reason: 'Conteúdo inapropriado', description: 'Usuário postou conteúdo ofensivo.' },
  { id: '2', reportedUser: 'Maria Santos', reason: 'Spam', description: 'Usuário está enviando mensagens em massa.' },
]

export default function PenaltiesAdminPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState(fakeReports)
  const [selectedPenalty, setSelectedPenalty] = useState('')
  const [observation, setObservation] = useState('')
  const [suspensionEndDate, setSuspensionEndDate] = useState('')

  if (user?.role !== 'admin') {
    return <div>Acesso não autorizado</div>
  }

  const handleApplyPenalty = (reportId: string) => {
    console.log('Applying penalty:', { reportId, penalty: selectedPenalty, observation, suspensionEndDate })
    setReports(reports.filter(report => report.id !== reportId))
    setSelectedPenalty('')
    setObservation('')
    setSuspensionEndDate('')
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Administração de Penalidades</h1>
      <div className="space-y-4">
        {reports.map((report) => (
          <Card key={report.id}>
            <CardHeader>
              <CardTitle>Denúncia contra {report.reportedUser}</CardTitle>
            </CardHeader>
            <CardContent>
              <p><strong>Motivo:</strong> {report.reason}</p>
              <p><strong>Descrição:</strong> {report.description}</p>
              <div className="mt-4 space-y-4">
                <div>
                  <Label htmlFor={`penalty-${report.id}`}>Penalidade</Label>
                  <Select onValueChange={setSelectedPenalty}>
                    <SelectTrigger id={`penalty-${report.id}`}>
                      <SelectValue placeholder="Selecione a penalidade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="warning">Advertência</SelectItem>
                      <SelectItem value="suspension">Suspensão</SelectItem>
                      <SelectItem value="ban">Banimento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor={`observation-${report.id}`}>Observação</Label>
                  <Textarea
                    id={`observation-${report.id}`}
                    placeholder="Adicione uma observação"
                    value={observation}
                    onChange={(e) => setObservation(e.target.value)}
                  />
                </div>
                {selectedPenalty === 'suspension' && (
                  <div>
                    <Label htmlFor={`suspension-end-${report.id}`}>Data de término da suspensão</Label>
                    <Input
                      id={`suspension-end-${report.id}`}
                      type="date"
                      value={suspensionEndDate}
                      onChange={(e) => setSuspensionEndDate(e.target.value)}
                    />
                  </div>
                )}
                <Button onClick={() => handleApplyPenalty(report.id)}>
                  Aplicar Penalidade
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

