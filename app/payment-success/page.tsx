'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CircleCheck as CheckCircle, Mail, Smartphone } from 'lucide-react';
import Link from 'next/link';
import confetti from 'canvas-confetti';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/login');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-50 to-emerald-100 p-4">
      <Card className="max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 rounded-full bg-emerald-100 flex items-center justify-center">
            <CheckCircle className="h-10 w-10 text-emerald-600" />
          </div>
          <CardTitle className="text-3xl">Payment Successful!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-4">
            <p className="text-lg text-neutral-700">
              Congratulations! Your course purchase has been confirmed.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 space-y-4">
              <div className="flex items-start gap-3">
                <Mail className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold text-emerald-900">Check Your Email</div>
                  <div className="text-sm text-emerald-700">
                    We've sent your login credentials to your email address. Please check your inbox.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Smartphone className="h-5 w-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-left">
                  <div className="font-semibold text-emerald-900">WhatsApp Notification</div>
                  <div className="text-sm text-emerald-700">
                    You'll also receive a WhatsApp message with your access details.
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-neutral-600 mb-4">
                Redirecting to login in <span className="font-bold text-emerald-600">{countdown}</span> seconds...
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Link href="/login">
                  <Button size="lg" className="w-full sm:w-auto">
                    Login Now
                  </Button>
                </Link>
                <Link href="/">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </div>

            <div className="pt-6 border-t">
              <p className="text-sm text-neutral-600">
                Need help? Contact our support team at{' '}
                <a href="mailto:support@fittransform.com" className="text-emerald-600 font-semibold">
                  support@fittransform.com
                </a>
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
