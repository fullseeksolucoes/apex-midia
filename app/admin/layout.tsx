import "@uploadthing/react/styles.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="min-h-screen bg-ink text-silver-50">{children}</div>;
}
