'use client';

import * as React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button variant="outline" size="icon" className="w-10 h-10">
        <div className="w-4 h-4" />
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      className="w-10 h-10 border-2 hover:scale-105 transition-all duration-200"
    >
      {theme === 'light' ? (
        <Moon className="w-4 h-4 transition-all" />
      ) : (
        <Sun className="w-4 h-4 transition-all" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}