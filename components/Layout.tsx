"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { BookIcon, BellIcon, SunIcon, MoonIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [notifications, setNotifications] = useState([
    { id: 1, message: "Novo livro disponível" },
    { id: 2, message: "Mensagem de outro usuário" },
  ]);

  const menuItems = [
    {
      label: "Livros",
      href: "/livros",
      roles: ["admin", "curador", "fornecedor", "tomador"],
    },
    {
      label: "Meus Contatos",
      href: "/contatos",
      roles: ["fornecedor", "tomador"],
    },
    {
      label: "Validação de Identidade",
      href: "/validacao-identidade",
      roles: ["admin", "curador"],
    },
    {
      label: "Curadoria de Denúncias",
      href: "/curadoria-denuncias",
      roles: ["admin", "curador"],
    },
    {
      label: "Administrar Penalidades",
      href: "/admin/penalidades",
      roles: ["admin"],
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-primary text-primary-foreground shadow-md">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <BookIcon className="h-6 w-6" />
            <span className="text-xl font-bold">Biblioteca Conectada</span>
          </Link>
          <nav className="hidden md:flex space-x-4">
            {menuItems.map(
              (item) =>
                item.roles.includes(user?.role || "") && (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="hover:underline"
                  >
                    {item.label}
                  </Link>
                )
            )}
          </nav>
          <div className="flex items-center space-x-4">
            {user && (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <BellIcon className="h-5 w-5" />
                      {notifications.length > 0 && (
                        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
                          {notifications.length}
                        </span>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {notifications.map((notification) => (
                      <DropdownMenuItem key={notification.id}>
                        {notification.message}
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5" />
              ) : (
                <MoonIcon className="h-5 w-5" />
              )}
            </Button>
            {user ? (
              <>
                <span>{user?.name}</span>
                <Button onClick={logout}>Sair</Button>
              </>
            ) : (
              <Link href="/login" className="hover:underline">
                Entrar
              </Link>
            )}
          </div>
        </div>
      </header>
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
