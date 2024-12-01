'use client'

import React, { createContext, useState, useContext, useEffect } from 'react'

type UserRole = 'admin' | 'curador' | 'fornecedor' | 'tomador'

interface User {
  id: string
  name: string
  email: string
  role: UserRole
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const fakeUsers: User[] = [
  { id: '1', name: 'Admin', email: 'admin@biblioteca.com', role: 'admin' },
  { id: '2', name: 'Curador', email: 'curador@biblioteca.com', role: 'curador' },
  { id: '3', name: 'Fornecedor', email: 'fornecedor@gmail.com', role: 'fornecedor' },
  { id: '4', name: 'Tomador', email: 'tomador@gmail.com', role: 'tomador' },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const login = async (email: string, password: string) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 150))

    const foundUser = fakeUsers.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (foundUser && password != null) {
      setUser(foundUser)
      localStorage.setItem('user', JSON.stringify(foundUser))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
