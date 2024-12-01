import { Layout } from "@/components/Layout";

export default function AuthorizedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <Layout>{children}</Layout>;
}
