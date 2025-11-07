'use client';

import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function BetaNoticeModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if user has seen the beta notice
    const hasSeenBetaNotice = localStorage.getItem('wellco_beta_notice_seen');

    // Wait 1 second after age verification modal
    const timer = setTimeout(() => {
      if (!hasSeenBetaNotice) {
        setIsOpen(true);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    localStorage.setItem('wellco_beta_notice_seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden animate-in fade-in zoom-in duration-300">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-wellco-neutral hover:bg-wellco-primary/10 flex items-center justify-center transition-colors"
          aria-label="Kapat"
        >
          <X className="w-5 h-5 text-wellco-text-dark/60" />
        </button>

        {/* Header with Gradient */}
        <div className="bg-gradient-to-br from-wellco-primary/10 via-wellco-secondary/20 to-wellco-accent-vibrant/10 px-6 py-8 text-center border-b border-wellco-primary/10">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white shadow-lg flex items-center justify-center">
            <svg
              className="w-8 h-8 text-wellco-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-serif font-light text-wellco-text-dark mb-2">
            Sitemiz Hazırlık Aşamasında
          </h2>
          <p className="text-sm text-wellco-text-dark/60">
            Sizler için daha iyi bir deneyim hazırlıyoruz
          </p>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-4">
          <div className="space-y-3 text-wellco-text-dark/80">
            <p className="leading-relaxed">
              Değerli müşterilerimiz, <strong className="text-wellco-primary">Wellco Adult</strong> olarak
              sizlere en kaliteli hizmeti sunmak için çalışıyoruz.
            </p>

            <div className="bg-wellco-neutral rounded-lg p-4 space-y-2">
              <p className="text-sm font-medium text-wellco-text-dark">
                🔄 <strong>Şu an devam eden çalışmalarımız:</strong>
              </p>
              <ul className="text-sm space-y-1.5 pl-6">
                <li className="list-disc">Ürün kataloglarımız özel olarak hazırlanıyor</li>
                <li className="list-disc">Fiyatlarımız optimize ediliyor</li>
                <li className="list-disc">Daha fazla bilimsel makale ve danışmanlık içeriği ekleniyor</li>
                <li className="list-disc">Uzman AI danışmanlarımız geliştirilmeye devam ediyor</li>
              </ul>
            </div>

            <div className="bg-gradient-to-br from-wellco-accent-vibrant/10 to-wellco-accent-magenta/10 rounded-lg p-4 border border-wellco-accent-vibrant/20">
              <p className="text-sm font-medium text-wellco-text-dark mb-2">
                🛒 <strong>Hemen alışveriş yapmak isterseniz:</strong>
              </p>
              <p className="text-sm text-wellco-text-dark/70 mb-3">
                Ana sayfamızdaki <strong>Trendyol</strong> ve <strong>Hepsiburada</strong> linklerinden
                pazaryeri mağazamıza ulaşabilir, güvenle alışveriş yapabilirsiniz.
              </p>
              <div className="flex gap-2">
                <a
                  href="https://www.trendyol.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-2 bg-wellco-accent-vibrant/10 hover:bg-wellco-accent-vibrant/20 text-wellco-accent-vibrant text-sm font-medium rounded-lg transition-colors"
                >
                  Trendyol Mağaza
                </a>
                <a
                  href="https://www.hepsiburada.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 text-center px-3 py-2 bg-wellco-accent-vibrant/10 hover:bg-wellco-accent-vibrant/20 text-wellco-accent-vibrant text-sm font-medium rounded-lg transition-colors"
                >
                  Hepsiburada Mağaza
                </a>
              </div>
            </div>

            <p className="text-sm text-wellco-text-dark/70 italic pt-2">
              Sitemiz yakında tam kapasiteyle sizlerle olacak.
              Anlayışınız için teşekkür ederiz. 💜
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6">
          <Button
            onClick={handleClose}
            className="w-full bg-wellco-primary hover:bg-wellco-primary/90 text-white py-6 text-base"
          >
            Anladım, Siteye Devam Et
          </Button>
        </div>
      </div>
    </div>
  );
}
