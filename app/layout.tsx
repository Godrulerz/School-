import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/theme-provider';
import { AnimatedBackground } from '@/components/animated-background';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'School Management System',
  description: 'A comprehensive school management and directory system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange={false}
        >
          <AnimatedBackground />
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}