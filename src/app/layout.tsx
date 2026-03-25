
import type {Metadata} from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Pink Petal Proposal',
  description: 'A romantic interactive journey for someone special.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Literata:ital,opsz,wght@0,7..72,200..900;1,7..72,200..900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased selection:bg-pink-200 selection:text-pink-900 overflow-x-hidden">{children}</body>
    </html>
  );
}
