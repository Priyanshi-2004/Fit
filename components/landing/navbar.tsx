'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Check initial auth state
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setIsLoggedIn(!!session);
      } catch (error) {
        console.error('Error checking auth:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-neutral-900">
              FitTransform
            </Link>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center gap-8">
              <a href="#about" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                About
              </a>
              <a href="#transformations" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Success Stories
              </a>
              <a href="#testimonials" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-neutral-600 hover:text-neutral-900 transition-colors">
                Pricing
              </a>
              {!isLoading && (
                <>
                  {isLoggedIn ? (
                    <Button variant="ghost" onClick={handleLogout}>Logout</Button>
                  ) : (
                    <Link href="/login">
                      <Button variant="ghost">Login</Button>
                    </Link>
                  )}
                  {!isLoggedIn && (
                    <Link href="#pricing">
                      <Button>Get Started</Button>
                    </Link>
                  )}
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-neutral-900">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-b border-neutral-200">
          <div className="px-4 pt-2 pb-4 space-y-3">
            <a
              href="#about"
              className="block py-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsOpen(false)}
            >
              About
            </a>
            <a
              href="#transformations"
              className="block py-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsOpen(false)}
            >
              Success Stories
            </a>
            <a
              href="#testimonials"
              className="block py-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsOpen(false)}
            >
              Testimonials
            </a>
            <a
              href="#pricing"
              className="block py-2 text-neutral-600 hover:text-neutral-900"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </a>
            {!isLoading && (
              <>
                {isLoggedIn ? (
                  <Button variant="ghost" className="w-full" onClick={() => {
                    setIsOpen(false);
                    handleLogout();
                  }}>Logout</Button>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full">Login</Button>
                    </Link>
                    <Link href="#pricing" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Get Started</Button>
                    </Link>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
