'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle } from 'lucide-react';

const AGE_VERIFICATION_KEY = 'wellco_age_verified';
const VERIFICATION_DURATION = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds

export function AgeVerification() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Check if user has already verified their age
    const verifiedData = localStorage.getItem(AGE_VERIFICATION_KEY);

    if (verifiedData) {
      try {
        const { timestamp } = JSON.parse(verifiedData);
        const now = Date.now();

        // Check if verification is still valid (within 30 days)
        if (now - timestamp < VERIFICATION_DURATION) {
          return; // Already verified and still valid
        }
      } catch (error) {
        console.warn('Invalid age verification data detected.', error);
      }
    }

    // Show modal after a short delay for better UX
    setTimeout(() => {
      setOpen(true);
    }, 500);
  }, []);

  const handleAccept = () => {
    // Store verification with timestamp
    const verificationData = {
      verified: true,
      timestamp: Date.now(),
    };
    localStorage.setItem(AGE_VERIFICATION_KEY, JSON.stringify(verificationData));
    setOpen(false);
  };

  const handleDecline = () => {
    // Redirect to a safe page or show message
    window.location.href = 'https://www.google.com';
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-md" showCloseButton={false}>
        <DialogHeader className="text-center">
          {/* Logo */}
          <div className="relative w-40 h-20 mx-auto mb-4">
            <Image
              src="/logo.svg"
              alt="Wellco Adult"
              fill
              className="object-contain"
            />
          </div>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-wellco-accent/10">
            <AlertCircle className="h-8 w-8 text-wellco-accent" />
          </div>
          <DialogTitle className="text-2xl font-bold text-wellco-accent">
            Yaş Doğrulama
          </DialogTitle>
          <DialogDescription className="text-base pt-4">
            <div className="space-y-4">
              <p>
                Bu site <strong>yetişkin içeriği</strong> barındırmaktadır.
              </p>
              <p>
                Devam etmek için <strong>18 yaşından büyük</strong> olduğunuzu onaylamanız gerekmektedir.
              </p>
              <Badge variant="outline" className="border-wellco-accent text-wellco-accent">
                🔞 18+ İçerik
              </Badge>
            </div>
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button
            onClick={handleAccept}
            className="w-full bg-wellco-primary hover:bg-wellco-primary-dark text-white"
            size="lg"
          >
            18 yaşından büyüğüm, onaylıyorum
          </Button>
          <Button
            onClick={handleDecline}
            variant="outline"
            className="w-full border-gray-300"
            size="lg"
          >
            18 yaşından küçüğüm
          </Button>
        </DialogFooter>

        <div className="mt-4 text-center">
          <p className="text-xs text-muted-foreground">
            Bu doğrulama 30 gün boyunca geçerlidir.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
