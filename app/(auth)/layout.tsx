export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="max-w-screen-xl mx-auto py-20">{children}</div>;
}
