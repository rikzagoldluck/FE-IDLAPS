import "./globals.css";

export const metadata = {
  title: "IDLaps",
  description: "Succeced your race with IDLaps",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark">
      <body>{children}</body>
    </html>
  );
}
