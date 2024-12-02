export interface Image {
  id: number;
  url: string;
}

export interface Review {
  id: number;
  rating: number;
  comment: string;
  user: number;
}

export interface Report {
  id: number;
  reporter_id: number;
  user_id: number;
  book_id: number;
  reason: string;
  stage: "pending" | "approved" | "rejected";
}

export interface Book {
  id: number;
  title: string;
  author: string;
  genre: string;
  pages: number;
  published: Date;
  baseImage: string;
  rating: number;
  reviews: Review[];
  users: number[];
}

export interface BookUser {
  id: number;
  baseBookId: number;
  images: Image[];
}

export interface Blocked {
  blocked: boolean;
  reason?: string;
  until?: Date;
}

export type Role = "admin" | "curador" | "fornecedor" | "tomador";

export type DocumentType = {
  name: string;
  url: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  cpfCnpj: string;
  docType: "CPF" | "CNPJ";
  roles: Role[];
  rating: number;
  verified: boolean;
  reviews: Review[];
  documents: DocumentType[];
  notifications: Notification[];
  books: BookUser[];
  blocked: Blocked;
  contacts: number[];
}

export interface Data {
  users: User[];
  books: Book[];
  reports: Report[];
}
