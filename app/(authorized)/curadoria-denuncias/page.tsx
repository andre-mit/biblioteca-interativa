'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Report {
  id: string
  reportedUser: string
  reason: string
  description: string
  status: 'pending' | 'approved' | 'rejected'
  observation?: string
}

const fakeReports: Report[] = [
  { id: '1', reportedUser: 'João Silva', reason: 'Conteúdo inapropriado', description: 'Usuário postou conteúdo ofensivo.', status: 'pending' },
  { id: '2', reportedUser: 'Maria Santos', reason: 'Spam', description: 'Usuário está enviando mensagens em massa.', status: 'pending' },
]

export default function ReportCurationPage() {
  const { user } = useAuth()
  const [reports, setReports] = useState(fakeReports)
  const [selectedReport, setSelectedReport] = useState<Report | null>(null)
  const [observation, setObservation] = useState('')
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  if (user?.role !== 'admin' && user?.role !== 'curador') {
    return <div>Acesso não autorizado</div>
  }

  const handleReportAction = (reportId: string, action: 'approve' | 'reject') => {
    setReports(reports.map(report => 
      report.id === reportId 
        ? { ...report, status: action === 'approve' ? 'approved' : 'rejected', observation } 
        : report
    ))
    setIsDialogOpen(false)
    setObservation('')
  }

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">Curadoria de Denúncias</h1>
      {reports.map((report) => (
        <Card key={report.id}>
          <CardHeader>
            <CardTitle>Denúncia contra {report.reportedUser}</CardTitle>
          </CardHeader>
          <CardContent>
            <p><strong>Motivo:</strong> {report.reason}</p>
            <p><strong>Descrição:</strong> {report.description}</p>
            <p><strong>Status:</strong> {report.status}</p>
            {report.observation && <p><strong>Observação:</strong> {report.observation}</p>}
            {report.status === 'pending' && (
              <div className="mt-4 flex space-x-2">
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button onClick={() => setSelectedReport(report)}>Avaliar</Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Avaliar Denúncia</DialogTitle>
                      <DialogDescription>
                        Você está prestes a avaliar a denúncia contra {selectedReport?.reportedUser}.
                      </DialogDescription>
                    </DialogHeader>
                    <Textarea
                      placeholder="Adicione uma observação (opcional)"
                      value={observation}
                      onChange={(e) => setObservation(e.target.value)}
                    />
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
                      <Button onClick={() => handleReportAction(selectedReport!.id, 'approve')}>Aprovar</Button>
                      <Button variant="destructive" onClick={() => handleReportAction(selectedReport!.id, 'reject')}>Rejeitar</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

