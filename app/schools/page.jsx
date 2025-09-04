'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { School, MapPin, Plus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSchools();
  }, []);

  const fetchSchools = async () => {
    try {
      const response = await fetch('/api/schools');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch schools');
      }
      
      setSchools(data.schools || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(err.message);
      setSchools([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin mx-auto mb-4 text-blue-600 dark:text-blue-400" />
          <p className="text-muted-foreground">Loading schools...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen relative flex items-center justify-center">
        <div className="absolute top-6 right-6 z-50">
          <ThemeToggle />
        </div>
        <div className="text-center">
          <p className="text-red-600 mb-4">Error: {error}</p>
          <Button onClick={fetchSchools} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative py-8 px-4">
      {/* Theme Toggle */}
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 dark:bg-blue-500 rounded-full mb-4 shadow-lg animate-pulse">
            <School className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-foreground mb-2">School Directory</h1>
          <p className="text-muted-foreground mb-6">Discover educational institutions in your area</p>
          
          <Link href="/add-school">
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-200 hover:scale-105 shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Add New School
            </Button>
          </Link>
        </div>

        {/* Schools Grid */}
        {schools.length === 0 ? (
          <div className="text-center py-12">
            <School className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">No Schools Found</h3>
            <p className="text-muted-foreground mb-6">Start by adding the first school to the directory</p>
            <Link href="/add-school">
              <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 hover:scale-105 transition-all duration-200 shadow-lg">
                <Plus className="w-4 h-4 mr-2" />
                Add First School
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {schools.map((school) => (
              <Card 
                key={school.id} 
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 shadow-md overflow-hidden bg-card/80 backdrop-blur-sm hover:bg-card/90"
              >
                <div className="aspect-video relative overflow-hidden bg-muted">
                  {school.imagePath ? (
                    <img
                      src={school.imagePath}
                      alt={school.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30">
                      <School className="w-12 h-12 text-blue-600 dark:text-blue-400" />
                    </div>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                    {school.name}
                  </h3>
                  
                  <div className="flex items-start space-x-2 text-muted-foreground mb-3">
                    <MapPin className="w-4 h-4 mt-1 flex-shrink-0 text-blue-500 dark:text-blue-400" />
                    <div className="text-sm leading-relaxed">
                      <p>{school.address}</p>
                      <p className="font-medium">{school.city}, {school.state}</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-border">
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Contact: {school.contact}</span>
                      <span>ID: #{school.id}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
    </div>
  );
}