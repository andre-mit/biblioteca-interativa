<QuickEdit file="app/validacao-identidade/page.tsx">
1. Import the Dialog components:
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

2. Add state for the dialog and selected user:
const [isDialogOpen, setIsDialogOpen] = useState(false)
const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null)

3. Update the handleApprove and handleRequestMoreInfo functions:
const handleApprove = () => {
  if (selectedUser) {
    console.log('Approving user:', selectedUser.id)
    setPendingUsers(pendingUsers.filter(user => user.id !== selectedUser.id))
    setIsDialogOpen(false)
    setSelectedUser(null)
  }
}

const handleRequestMoreInfo = () => {
  if (selectedUser) {
    console.log('Requesting more info for user:', selectedUser.id)
    setPendingUsers(pendingUsers.filter(user => user.id !== selectedUser.id))
    setIsDialogOpen(false)
    setSelectedUser(null)
  }
}

4. Wrap the approval buttons with the Dialog component:
<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button onClick={() => setSelectedUser(pendingUser)}>
      Aprovar
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Aprovação</DialogTitle>
      <DialogDescription>
        Você está prestes a aprovar o usuário {selectedUser?.name}. Esta ação não pode ser desfeita.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
      <Button onClick={handleApprove}>Confirmar Aprovação</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

<Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
  <DialogTrigger asChild>
    <Button variant="outline" onClick={() => setSelectedUser(pendingUser
)}>
      Solicitar mais informações
    </Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Confirmar Solicitação</DialogTitle>
      <DialogDescription>
        Você está prestes a solicitar mais informações do usuário {selectedUser?.name}.
      </DialogDescription>
    </DialogHeader>
    <DialogFooter>
      <Button variant="outline" onClick={() => setIsDialogOpen(false)}>Cancelar</Button>
      <Button onClick={handleRequestMoreInfo}>Confirmar Solicitação</Button>
    </DialogFooter>
  </DialogContent>
</Dialog>
</QuickEdit>

