import RootShell, { baseMetadata } from "@/components/RootShell";

export const metadata = baseMetadata;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <RootShell locale="it">{children}</RootShell>;
}
