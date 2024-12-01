'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegistering, setIsRegistering] = useState(false)
  const [cpfCnpj, setCpfCnpj] = useState('')
  const [documentPhoto, setDocumentPhoto] = useState<File | null>(null)
  const [lgpdConsent, setLgpdConsent] = useState(false)
  const [confirmPassword, setConfirmPassword] = useState('');
  const { login } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (isRegistering) {
      // Handle registration logic here
      console.log('Registering with:', { email, password, confirmPassword, cpfCnpj, documentPhoto, lgpdConsent })
    } else {
      const success = await login(email, password)
      if (success) {
        router.push('/')
      } else {
        alert('Login falhou. Por favor, tente novamente.')
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h1 className="text-2xl font-bold mb-6 text-center">
          {isRegistering ? 'Cadastro' : 'Login'}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="email">E-mail</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {isRegistering && (
            <>
              <div>
                <Label htmlFor="cpfCnpj">CPF/CNPJ</Label>
                <Input
                  id="cpfCnpj"
                  type="text"
                  value={cpfCnpj}
                  onChange={(e) => setCpfCnpj(e.target.value)}
                  required
                />
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </div>
              <div className="flex items-start space-x-2">
                <Checkbox
                  id="lgpdConsent"
                  checked={lgpdConsent}
                  onCheckedChange={(checked) => setLgpdConsent(checked as boolean)}
                />
                <div className="grid gap-1.5 leading-none">
                  <Label htmlFor="lgpdConsent" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Concordo com os termos da <Link href="#" className="underline">LGPD</Link>
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Esta validação é necessária para autenticar sua identidade, conforme os artigos 7º e 11º da LGPD.
                  </p>
                </div>
              </div>
              <div>
                <Label htmlFor="documentPhoto">Foto do Documento</Label>
                <Input
                  id="documentPhoto"
                  type="file"
                  onChange={(e) => setDocumentPhoto(e.target.files?.[0] || null)}
                  required
                />
              </div>
            </>
          )}
          <Button type="submit" className="w-full">
            {isRegistering ? 'Cadastrar' : 'Entrar'}
          </Button>
        </form>
        <p className="mt-4 text-center">
          {isRegistering ? 'Já tem uma conta?' : 'Não tem uma conta?'}
          <Button
            variant="link"
            onClick={() => setIsRegistering(!isRegistering)}
            className="ml-1"
          >
            {isRegistering ? 'Faça login' : 'Cadastre-se'}
          </Button>
        </p>
      </div>
    </div>
  )
}

