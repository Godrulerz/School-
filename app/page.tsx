import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { School, Plus, List, Users, BookOpen } from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';

export default function Home() {
  return (
    <div className="min-h-screen relative">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-600 dark:bg-blue-500 rounded-full mb-6 shadow-lg animate-pulse">
              <School className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              School Management
              <span className="block text-blue-600 dark:text-blue-400 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                System
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Streamline your educational institution management with our comprehensive 
              school directory and administration platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/add-school">
                <Button size="lg" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <Plus className="w-5 h-5 mr-2" />
                  Add New School
                </Button>
              </Link>
              <Link href="/schools">
                <Button size="lg" variant="outline" className="w-full sm:w-auto h-12 px-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <List className="w-5 h-5 mr-2" />
                  View All Schools
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">Key Features</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Everything you need to manage and organize educational institutions effectively
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mb-4">
                  <Plus className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Easy Registration</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Simple and intuitive form to register new schools with comprehensive details 
                  and image uploads.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <List className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">School Directory</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse through all registered schools in an elegant grid layout with 
                  essential information at a glance.
                </p>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 bg-card/80 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
                  <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Responsive Design</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Fully responsive interface that works seamlessly across all devices 
                  and screen sizes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-background/80 backdrop-blur-sm border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <School className="w-6 h-6 text-blue-600 dark:text-blue-400" />
            <span className="text-xl font-bold text-foreground">School Management</span>
          </div>
          <p className="text-muted-foreground">
            Developed by{' '}
            <a 
              href="https://godz.rf.gd/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium transition-colors duration-200 underline decoration-2 underline-offset-2 hover:decoration-blue-500"
            >
              Ashish Kumar
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}